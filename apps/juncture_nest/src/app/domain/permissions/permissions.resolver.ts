import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { PermissionsService } from './permissions.service';
import { Id, Input } from 'src/app/core/decorators';
import { Permission, Prisma } from '@prisma/client';

@Resolver('Permission')
export class PermissionsResolver {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Query()
  async permissions() {
    return this.permissionsService.findAll();
  }

  @Query()
  async permission(@Id() id: string) {
    return this.permissionsService.findOne({ where: { id } });
  }

  @Mutation()
  async createPermission(@Input() data: Prisma.PermissionCreateInput) {
    return this.permissionsService.create({ data });
  }

  @Mutation()
  async updatePermission(@Id() id: string, @Input() data: Prisma.PermissionUpdateInput) {
    return this.permissionsService.update({ where: { id }, data });
  }

  @Mutation()
  async deletePermission(@Id() id: string) {
    return this.permissionsService.delete({ id });
  }

  @Mutation()
  async recoverPermission(@Id() id: string): Promise<Permission> {
    return this.permissionsService.recover({ id });
  }
}
