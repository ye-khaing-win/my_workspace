import { PipeTransform } from '@nestjs/common';

export class CastifyCreatablePipe implements PipeTransform {
  transform(value: any): any {
    return {
      create: value,
    };
  }
}
