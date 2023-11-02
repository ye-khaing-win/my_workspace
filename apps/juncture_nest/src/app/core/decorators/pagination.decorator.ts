import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { PaginationArgs } from '../enums';

export const Pagination = createParamDecorator(
  (data: PaginationArgs, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const args = ctx.getArgs();
    const pagination = args?.pagination ?? {};

    const page = pagination?.page || 1;
    const limit = pagination?.limit || 10;
    const skip = (page - 1) * limit;

    switch (data) {
      case PaginationArgs.SKIP:
        return skip;
      case PaginationArgs.TAKE:
        return limit;
      default:
        return { skip, take: limit };
    }
  }
);
