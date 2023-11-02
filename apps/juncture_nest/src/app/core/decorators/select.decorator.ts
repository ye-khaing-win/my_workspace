import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { FieldsByTypeName, parseResolveInfo } from 'graphql-parse-resolve-info';
import { castNestedSelectables } from 'src/utils/helpers';

export const Select = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const info = ctx.getInfo();
  const resolvedInfo = parseResolveInfo(info);
  const resourceTree: FieldsByTypeName[any] = Object.values(resolvedInfo.fieldsByTypeName)[0];

  return castNestedSelectables(resourceTree);
});
