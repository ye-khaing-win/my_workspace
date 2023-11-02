import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { Id, Input, OrderBy, Pagination, Select, Where } from 'src/app/core/decorators';
import { Prisma, User } from '@prisma/client';
import { PaginationArgs } from 'src/app/core/enums';

@Resolver('User')
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query()
  async users(
    @Where() where: Prisma.UserWhereInput,
    @Select() select: Prisma.UserSelect,
    @OrderBy() orderBy: Prisma.UserOrderByWithRelationInput,
    @Pagination(PaginationArgs.SKIP) skip: number,
    @Pagination(PaginationArgs.TAKE) take: number
  ): Promise<User[]> {
    return this.usersService.findAll({ where, select, orderBy, skip, take });
  }

  @Query()
  async user(@Id() id: string, @Select() select: Prisma.UserSelect) {
    return this.usersService.findOne({ where: { id }, select });
  }

  @Mutation()
  async createUser(
    @Input() data: Prisma.UserUncheckedCreateInput,
    @Select() select: Prisma.UserSelect
  ): Promise<User> {
    return this.usersService.create({ data, select });
  }

  @Mutation()
  async updateUser(
    @Id() id: string,
    @Input() data: Prisma.UserUpdateInput,
    @Select() select: Prisma.UserSelect
  ) {
    return this.usersService.update({ where: { id }, data, select });
  }

  @Mutation()
  async deleteUser(@Id() id: string) {
    return this.usersService.delete({ id });
  }
}
