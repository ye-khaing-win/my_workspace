import { Resolver, Query, Mutation } from '@nestjs/graphql';
import { IndustriesService } from './industries.service';
import { Prisma, Industry } from '@prisma/client';
import { OrderBy, Select, Where, Pagination, Id, Input } from 'src/app/core/decorators';
import { PaginationArgs } from 'src/app/core/enums';

@Resolver('Industry')
export class IndustriesResolver {
  constructor(private readonly industriesService: IndustriesService) {}

  @Query()
  async industries(
    @Where() where: Prisma.IndustryWhereInput,
    @Select() select: Prisma.IndustrySelect,
    @OrderBy() orderBy: Prisma.IndustryOrderByWithRelationInput,
    @Pagination(PaginationArgs.SKIP) skip: number,
    @Pagination(PaginationArgs.TAKE) take: number
  ): Promise<Industry[]> {
    return this.industriesService.findAll({ where, select, orderBy, skip, take });
  }

  @Query()
  async industry(@Id() id: string, @Select() select: Prisma.IndustrySelect): Promise<Industry> {
    return this.industriesService.findOne({ where: { id }, select });
  }

  @Mutation()
  async createIndustry(@Input() data: Prisma.IndustryCreateInput): Promise<Industry> {
    return this.industriesService.create({ data });
  }

  @Mutation()
  async updateIndustry(
    @Id() id: string,
    @Input() data: Prisma.IndustryUpdateInput
  ): Promise<Industry> {
    return this.industriesService.update({ where: { id }, data });
  }

  @Mutation()
  async deleteIndustry(@Id() id: string): Promise<Industry> {
    return this.industriesService.delete({ id });
  }

  @Mutation()
  async recoverIndustry(@Id() id: string): Promise<Industry> {
    return this.industriesService.recover({ id });
  }
}
