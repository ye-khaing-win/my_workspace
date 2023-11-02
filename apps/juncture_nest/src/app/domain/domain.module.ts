import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { CompaniesModule } from './companies/companies.module';
import { IndustriesModule } from './industries/industries.module';
import { PermissionsModule } from './permissions/permissions.module';
import { RolesModule } from './roles/roles.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    AuthModule,
    CompaniesModule,
    IndustriesModule,
    PermissionsModule,
    RolesModule,
    UsersModule,
  ],
})
export class DomainModule {}
