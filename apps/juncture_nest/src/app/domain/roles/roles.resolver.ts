import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { RolesService } from './roles.service';
import { GetCompany, Id, Input, Select } from 'src/app/core/decorators';
import { Role, Prisma } from '@prisma/client';
import { RoleArgs } from './enums';
import { CastifyConnectablePipe, CastifySettablePipe } from 'src/app/core/pipes';

@Resolver('Role')
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Query()
  async roles(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Query()
  async role(@Id() id: string): Promise<Role> {
    return this.rolesService.findOne({ where: { id } });
  }

  @Mutation()
  async createRole(
    @Input() data: Prisma.RoleUncheckedCreateInput,
    @Input(RoleArgs.PERMISSIONS, CastifyConnectablePipe) permissions: any,
    @Select() select: Prisma.RoleSelect,
    @GetCompany() companyId: string
  ): Promise<Role> {
    return this.rolesService.create({ data: { ...data, permissions, companyId }, select });
  }

  @Mutation()
  async updateRole(
    @Id() id: string,
    @Input() data: Prisma.RoleUncheckedUpdateInput,
    @Input(RoleArgs.PERMISSIONS, CastifySettablePipe) permissions: any,
    @Select() select: Prisma.RoleSelect
  ): Promise<Role> {
    return this.rolesService.update({
      where: { id },
      data: { ...data, permissions },
      select,
    });
  }

  @Mutation()
  async deleteRole(@Id() id: string): Promise<Role> {
    return this.rolesService.delete({ id });
  }

  @Mutation()
  async recoverRole(@Id() id: string): Promise<Role> {
    return this.rolesService.recover({ id });
  }
}
