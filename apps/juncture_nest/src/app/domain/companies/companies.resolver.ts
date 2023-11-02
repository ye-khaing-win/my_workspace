import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { Company, Prisma } from '@prisma/client';
import {
  CastifyCreatablePipe,
  CastifyUpdatablePipe,
  CastifyUploadablePipe,
} from 'src/app/core/pipes';
import { CompanyArgs } from './enums';
import { OrderBy, Select, Where, Pagination, Id, Input } from 'src/app/core/decorators';
import { Creatable, Updatable } from 'src/app/core/interfaces';
import { PaginationArgs } from 'src/app/core/enums';
import { AuthGuard } from 'src/app/core/guards';
import { StorageService } from 'src/app/shared/storage/storage.service';

@UseGuards(AuthGuard)
@Resolver('Company')
export class CompaniesResolver {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly storage: StorageService
  ) {}

  @Query()
  async companies(
    @Where() where: Prisma.CompanyWhereInput,
    @Select() select: Prisma.CompanySelect,
    @OrderBy() orderBy: Prisma.CompanyOrderByWithRelationInput,
    @Pagination(PaginationArgs.SKIP) skip: number,
    @Pagination(PaginationArgs.TAKE) take: number
  ): Promise<Company[]> {
    return this.companiesService.findAll({ where, select, orderBy, skip, take });
  }

  @Query()
  async company(@Id() id: string, @Select() select: Prisma.CompanySelect): Promise<Company> {
    return this.companiesService.findOne({ where: { id }, select });
  }

  @Mutation()
  async createCompany(
    @Input() data: Prisma.CompanyCreateInput,
    @Input(CompanyArgs.SIZE, CastifyCreatablePipe) size: Creatable<Prisma.SizeCreateInput>,
    @Input(CompanyArgs.SOCIAL_LINKS, CastifyCreatablePipe)
    socialLinks: Creatable<Prisma.SocialLinkCreateInput>,
    @Input(CompanyArgs.PALETTE, CastifyCreatablePipe)
    palette: Creatable<Prisma.PaletteCreateInput>,
    @Input(CompanyArgs.TESTIMONIAL, CastifyCreatablePipe)
    testimonial: Creatable<Prisma.TestimonialCreateInput>,
    @Select() select: Prisma.CompanySelect,
    @Args('logo', CastifyUploadablePipe) uploadable: any
  ): Promise<Company> {
    const uploaded = await this.storage.uploadImage(uploadable);
    const logo = new CastifyCreatablePipe().transform(uploaded);

    return this.companiesService.create({
      data: {
        ...data,
        size,
        socialLinks,
        palette,
        testimonial,
        logo,
      },
      select,
    });
  }

  @Mutation()
  async updateCompany(
    @Id() id: string,
    @Input() data: Prisma.CompanyUpdateInput,
    @Input(CompanyArgs.SIZE, CastifyUpdatablePipe) size: Updatable<Prisma.SizeUpdateInput>,
    @Input(CompanyArgs.PALETTE, CastifyUpdatablePipe)
    palette: Updatable<Prisma.PaletteUpdateInput>,
    @Input(CompanyArgs.TESTIMONIAL, CastifyUpdatablePipe)
    testimonial: Updatable<Prisma.TestimonialUpdateInput>,
    @Select() select: Prisma.CompanySelect
  ): Promise<Company> {
    return this.companiesService.update({
      where: { id },
      data: { ...data, size, palette, testimonial },
      select,
    });
  }

  @Mutation()
  async deleteCompany(@Id() id: string): Promise<Company> {
    return this.companiesService.delete({ id });
  }

  @Mutation()
  async recoverCompany(@Id() id: string): Promise<Company> {
    return this.companiesService.recover({ id });
  }
}
