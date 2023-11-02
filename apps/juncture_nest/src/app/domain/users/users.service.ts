import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/app/core/services';
import { User, Prisma } from '@prisma/client';
import { Models } from 'src/app/core/enums';
import { PrismaService } from 'src/app/shared/prisma/prisma.service';
import * as argon from 'argon2';
import { hashViaCrypto } from 'src/utils/helpers';

@Injectable()
export class UsersService extends CrudService<
  User,
  Prisma.UserUncheckedCreateInput,
  Prisma.UserUncheckedUpdateInput,
  Prisma.UserWhereInput,
  Prisma.UserWhereUniqueInput,
  Prisma.UserSelect,
  Prisma.UserOrderByWithRelationInput
> {
  protected readonly modelName = Models.USER;

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async create(params: {
    data: Prisma.UserUncheckedCreateInput;
    select?: Prisma.UserSelect;
  }): Promise<User> {
    const { data, select } = params;

    // ENCRYPTING THE PASSWORD
    const { password, otp } = data;
    const hashedPassword = await argon.hash(password);
    let hashedOtp: string;

    if (otp) {
      hashedOtp = hashViaCrypto(otp);
    }

    return super.create({ data: { ...data, password: hashedPassword, otp: hashedOtp }, select });
  }
}
