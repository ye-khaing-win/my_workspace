import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/app/core/services';
import { Prisma, Permission } from '@prisma/client';
import { Models } from 'src/app/core/enums';
import { PrismaService } from 'src/app/shared/prisma/prisma.service';

@Injectable()
export class PermissionsService extends CrudService<
  Permission,
  Prisma.PermissionCreateInput,
  Prisma.PermissionUpdateInput
> {
  protected readonly modelName = Models.PERMISSION;

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
