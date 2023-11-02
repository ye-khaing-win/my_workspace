import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/app/core/services';
import { Company, Prisma } from '@prisma/client';
import { PrismaService } from 'src/app/shared/prisma/prisma.service';
import { Models } from 'src/app/core/enums';
import { DEFAULT_ROLES } from 'src/app/core/constants';

@Injectable()
export class CompaniesService extends CrudService<
  Company,
  Prisma.CompanyCreateInput,
  Prisma.CompanyUpdateInput,
  Prisma.CompanyWhereInput,
  Prisma.CompanyWhereUniqueInput,
  Prisma.CompanySelect,
  Prisma.CompanyOrderByWithRelationInput
> {
  protected readonly modelName = Models.COMPANY;

  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  async create(params: {
    data: Prisma.CompanyCreateInput;
    select?: Prisma.CompanySelect;
  }): Promise<Company> {
    const { data, select } = params;

    const company = await super.create({ data, select });

    // CREATING DEFAULT ROLES FOR THE COMPANY
    const defaultRoles = DEFAULT_ROLES.map((role) => ({ ...role, companyId: company.id }));

    await this.prisma.role.createMany({ data: defaultRoles });

    return company;
  }

  async update(params: {
    where: Prisma.CompanyWhereUniqueInput;
    data: Prisma.CompanyUpdateInput;
    select?: Prisma.CompanySelect;
  }): Promise<Company> {
    const { where, data, select } = params;
    const socialLinks = data.socialLinks as Prisma.SocialLinkCreateWithoutCompanyInput | undefined;

    // ADDING UPDATE SOCIAL LINKS FEATURES
    return super.update({
      where,
      data: {
        ...data,
        socialLinks: socialLinks && {
          deleteMany: {},
          create: socialLinks,
        },
      },
      select,
    });
  }
}
