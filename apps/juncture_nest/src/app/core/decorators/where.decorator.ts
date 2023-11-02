import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Where = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const args = ctx.getArgs();
  const filter = args?.filter;
  const search = args?.search;

  let searchCriteria = {};

  if (search) {
    searchCriteria = {
      OR: Object.keys(search).map((key) => ({
        [key]: { contains: search[key] },
      })),
    };
  }

  return { ...filter, ...searchCriteria };
});
