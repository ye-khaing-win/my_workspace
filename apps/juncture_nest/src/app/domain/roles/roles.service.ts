import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/app/core/services';
import { Prisma, Role } from '@prisma/client';
import { Models } from 'src/app/core/enums';
import { PrismaService } from 'src/app/shared/prisma/prisma.service';

@Injectable()
export class RolesService extends CrudService<
  Role,
  Prisma.RoleUncheckedCreateInput,
  Prisma.RoleUncheckedUpdateInput
> {
  protected readonly modelName = Models.ROLE;

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
