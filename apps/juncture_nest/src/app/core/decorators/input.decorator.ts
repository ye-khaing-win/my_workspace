import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const Input = createParamDecorator((arg: string, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const args = ctx.getArgs();

  if (arg) {
    return args?.input[arg];
  }

  return args?.input;
});
