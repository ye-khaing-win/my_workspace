import { Resolver, Mutation } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { GetCompany, Input } from 'src/app/core/decorators';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/app/core/guards';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  async signupAdmin(@Input() data: any) {
    return this.authService.signupAdmin(data);
  }

  @UseGuards(AuthGuard)
  @Mutation()
  async inviteCandidate(@Input() data: any, @GetCompany() companyId: string) {
    return this.authService.inviteMember(companyId, data);
  }

  @Mutation()
  async signupMember(@Input() data: any) {
    return this.authService.signupMember(data);
  }

  @Mutation()
  async login(@Input() data: any) {
    return this.authService.login(data);
  }
}
