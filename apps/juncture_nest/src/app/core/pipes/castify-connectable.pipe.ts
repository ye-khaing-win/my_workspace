import { PipeTransform } from '@nestjs/common';

export class CastifyConnectablePipe implements PipeTransform {
  transform(value: string[] | string): any {
    if (value instanceof Array) {
      return {
        connect: value.map((id) => ({ id })),
      };
    }

    return { connect: value };
  }
}
