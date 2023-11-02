import { PipeTransform } from '@nestjs/common';

export class CastifyUpdatablePipe implements PipeTransform {
  transform(value: any): any {
    return {
      update: value,
    };
  }
}
