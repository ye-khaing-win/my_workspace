import { PipeTransform } from '@nestjs/common';

export class CastifyUploadablePipe implements PipeTransform {
  async transform(value: any): Promise<any> {
    const { file } = await value;

    return file;
  }
}
