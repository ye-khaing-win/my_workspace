import * as argon from 'argon2';
import { BadRequestException, ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { ErrorMessages, EnvVariables, SuccessMessages } from 'src/app/core/enums';
import { AuthResponse, MessageResponse, RoleTypes } from 'src/graphql';
import { PrismaService } from 'src/app/shared/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { IJwtPayload } from 'src/app/core/interfaces';
import { UserStatuses } from '../users/enums';
import { generateOTP, generateRandomString, hashViaCrypto } from 'src/utils/helpers';
import { EmailsService } from 'src/app/shared/emails/emails.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly config: ConfigService,
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly emailsService: EmailsService
  ) {}

  private async getSignToken(payload: IJwtPayload): Promise<string> {
    return this.jwt.signAsync(payload, {
      secret: this.config.get<string>(EnvVariables.JWT_SECRET),
      expiresIn: this.config.get<string>(EnvVariables.ACCESS_TOKEN_EXPIRES_IN),
    });
  }

  async signupAdmin(data: Prisma.UserUncheckedCreateInput): Promise<AuthResponse> {
    const { companyId, password } = data;

    const adminRole = await this.prisma.role.findFirst({
      where: { companyId, type: RoleTypes.ADMIN },
    });

    if (!adminRole) {
      throw new BadRequestException(ErrorMessages.COMPANY_NOT_FOUND);
    }

    const hasAdmin = await this.prisma.user.findFirst({
      where: { companyId, roleId: adminRole.id },
    });

    if (hasAdmin) {
      throw new ForbiddenException(ErrorMessages.ADMIN_EXISTED);
    }
    const hashedPassword = await argon.hash(password);

    const admin = await this.prisma.user.create({
      data: { ...data, password: hashedPassword, roleId: adminRole.id },
    });
    const payload = { userId: admin.id, companyId };
    const token = await this.getSignToken(payload);

    return { token };
  }

  async inviteMember(
    companyId: string,
    data: Prisma.UserUncheckedCreateInput
  ): Promise<MessageResponse> {
    const { email, roleId } = data;
    const member = await this.prisma.user.findFirst({ where: { email, companyId } });

    if (member) {
      switch (member.status) {
        case UserStatuses.ACTIVE:
          throw new BadRequestException(ErrorMessages.USER_EXISTED);

        case UserStatuses.INACTIVE:
        case UserStatuses.PENDING:
          await this.prisma.user.delete({ where: { id: member.id } });
          break;
      }
    }

    const role = await this.prisma.role.findUnique({ where: { id: roleId } });

    if (!role) {
      throw new BadRequestException(ErrorMessages.DOCUMENT_NOT_FOUND);
    }

    if (role.type === RoleTypes.ADMIN) {
      throw new ForbiddenException(ErrorMessages.ADMIN_EXISTED);
    }

    const password = generateRandomString();
    const hashedPassword = await argon.hash(password);
    const otp = generateOTP();
    const hashedOtp = hashViaCrypto(otp);

    const candidate = await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        roleId,
        companyId,
        otp: hashedOtp,
        status: UserStatuses.PENDING,
      },
      select: {
        company: true,
      },
    });

    await this.emailsService.sendMemberInvitationEmaiil({
      recipient: email,
      context: {
        company: candidate.company.name,
        role: role.name,
        otp,
      },
    });

    return {
      message: SuccessMessages.EMAIL_SENT,
    };
  }

  async signupMember(data: Prisma.UserUncheckedCreateInput): Promise<AuthResponse> {
    const { email, otp, password } = data;

    const hashedOtp = hashViaCrypto(otp);
    const hashedPassword = await argon.hash(password);

    let member = await this.prisma.user.findFirst({
      where: { email, status: UserStatuses.PENDING },
    });

    if (!member) {
      throw new ForbiddenException(ErrorMessages.USER_NOT_REQUESTED);
    }

    if (member.otp !== hashedOtp) {
      throw new BadRequestException(ErrorMessages.INCORRECT_OTP);
    }

    member = await this.prisma.user.update({
      where: { id: member.id },
      data: {
        ...data,
        password: hashedPassword,
        otp: null,
        status: UserStatuses.ACTIVE,
      },
    });

    const payload: IJwtPayload = {
      userId: member.id,
      companyId: member.companyId,
    };
    const token = await this.getSignToken(payload);

    return {
      token,
    };
  }

  async login(data: Prisma.UserUncheckedCreateInput): Promise<AuthResponse> {
    const { name, password } = data;
    const user = await this.prisma.user.findUnique({
      where: { name },
    });

    if (!user) {
      throw new ForbiddenException(ErrorMessages.CREDENTIALS_INCORRECT);
    }

    const passwordMatched = await argon.verify(user.password, password);

    if (!passwordMatched) {
      throw new ForbiddenException(ErrorMessages.CREDENTIALS_INCORRECT);
    }

    const payload = { userId: user.id, companyId: user.companyId };
    const token = await this.getSignToken(payload);

    return { token };
  }
}
