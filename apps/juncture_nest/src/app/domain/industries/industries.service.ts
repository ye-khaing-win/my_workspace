import { Injectable } from '@nestjs/common';
import { Industry, Prisma } from '@prisma/client';
import { PrismaService } from 'src/app/shared/prisma/prisma.service';
import { CrudService } from 'src/app/core/services';
import { Models } from 'src/app/core/enums';

@Injectable()
export class IndustriesService extends CrudService<
  Industry,
  Prisma.IndustryCreateInput,
  Prisma.IndustryUpdateInput,
  Prisma.IndustryWhereInput,
  Prisma.IndustryWhereUniqueInput,
  Prisma.IndustrySelect,
  Prisma.IndustryOrderByWithRelationInput
> {
  protected readonly modelName = Models.INDUSTRY;

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }
}
