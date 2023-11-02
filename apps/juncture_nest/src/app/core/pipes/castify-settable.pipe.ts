import { PipeTransform } from '@nestjs/common';

export class CastifySettablePipe implements PipeTransform {
  transform(value: string[] | string): any {
    if (value instanceof Array) {
      return {
        set: value.map((id) => ({ id })),
      };
    }

    return { set: value };
  }
}
