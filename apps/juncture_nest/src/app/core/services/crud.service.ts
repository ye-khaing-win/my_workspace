import { NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'src/app/shared/prisma/prisma.service';
import { Cache } from 'cache-manager';

export abstract class CrudService<E, C, U, W = any, Wu = any, S = any, O = any> {
  protected abstract modelName: string;

  constructor(
    protected readonly prisma: PrismaService,
    protected readonly cacheManager: Cache = null
  ) {}

  async findAll(
    params: {
      select?: S;
      cursor?: Wu;
      where?: W;
      orderBy?: O;
      skip?: number;
      take?: number;
    } = {}
  ): Promise<E[]> {
    const { select, skip, take, cursor, where, orderBy } = params;

    if (this.cacheManager) {
      const cachedEntities = await this.cacheManager.get<E[]>(params.toString());

      if (cachedEntities) {
        console.log('FROM CACHE');
        return cachedEntities;
      }
    }

    const entities = await this.prisma[this.modelName].findMany({
      select,
      skip,
      take,
      cursor,
      where: {
        ...where,
        deletedAt: null,
      },
      orderBy,
    });

    if (this.cacheManager) {
      this.cacheManager.set(params.toString(), entities);
    }

    console.log('FROM DB');
    return entities;
  }

  async findOne(
    params: {
      where?: Wu;
      select?: S;
    } = {}
  ): Promise<E> {
    const { where, select } = params;
    const entity = await this.prisma[this.modelName].findUnique({
      where: {
        ...where,
        deletedAt: null,
      },
      select,
    });

    if (!entity) {
      throw new NotFoundException(`No ${this.modelName} found. Please try again`);
    }

    return entity;
  }

  async create(params: { data: C; select?: S }): Promise<E> {
    const { data, select } = params;

    return this.prisma[this.modelName].create({ data, select });
  }

  async update(params: { where: Wu; data: U; select?: S }): Promise<E> {
    const { where, data, select } = params;

    const entity = await this.prisma[this.modelName].findUnique({
      where: {
        ...where,
        deletedAt: null,
      },
      select: {
        id: true,
      },
    });

    if (!entity) {
      throw new NotFoundException(`No ${this.modelName} found. Please try again`);
    }

    return this.prisma[this.modelName].update({
      where: {
        ...where,
        deletedAt: null,
      },
      data,
      select,
    });
  }

  async delete(where: Wu): Promise<E> {
    const entity = await this.prisma[this.modelName].findUnique({
      where: {
        ...where,
        deletedAt: null,
      },
    });

    if (!entity) {
      throw new NotFoundException(`No ${this.modelName} found. Please try again`);
    }

    if (entity?.default) {
      throw new BadRequestException(`Could not delete default ${this.modelName}.`);
    }

    return this.prisma[this.modelName].update({
      where,
      data: {
        deletedAt: new Date(),
      },
    });
  }

  async recover(where: Wu): Promise<E> {
    const entity = await this.prisma[this.modelName].findUnique({
      where,
      select: { id: true, deletedAt: true },
    });

    if (!entity) {
      throw new NotFoundException(`No ${this.modelName} found. Please try again.`);
    }

    if (!entity.deletedAt) {
      throw new BadRequestException(`${this.modelName} not deleted.`);
    }

    return this.prisma[this.modelName].update({
      where,
      data: {
        deletedAt: null,
      },
    });
  }
}
