import { Injectable } from '@nestjs/common';
import { join } from 'path';
import { PrismaService } from '../prisma/prisma.service';
import { S3Service } from '@dev/s3';
import { generateRandomString } from 'src/utils/helpers';
import { lookup } from 'mime-types';
import { UploadFileDto } from './dtos/upload-file.dto';
import * as sharp from 'sharp';
import { IMAGE_SIZE, MAX_WIDTH, QUALITY_ARRAY } from './constants';
import { Ratios } from './enums';

@Injectable()
export class FilesService {
  constructor(private readonly prisma: PrismaService, private readonly s3: S3Service) {}

  private async compressImage(buffer: Buffer, ratio?: number): Promise<Buffer> {
    let compressedBuffer: sharp.Sharp | Buffer = sharp(buffer).jpeg({
      mozjpeg: true,
      chromaSubsampling: '4:4:4',
    });

    if (ratio) {
      compressedBuffer.resize({
        width: MAX_WIDTH,
        height: Math.round(MAX_WIDTH * ratio),
        fit: 'cover',
      });
    }

    compressedBuffer = await compressedBuffer.toBuffer();

    if (compressedBuffer.length > IMAGE_SIZE) {
      for (let i = 0; i < QUALITY_ARRAY.length; i++) {
        const quality = QUALITY_ARRAY[i];
        const smallerBuffer = await sharp(compressedBuffer)
          .jpeg({
            quality,
            chromaSubsampling: '4:4:4',
          })
          .toBuffer();

        if (smallerBuffer.length <= IMAGE_SIZE || quality === 10) {
          compressedBuffer = smallerBuffer;
          break;
        }
      }
    }

    return compressedBuffer;
  }

  // async uploadImage(file: UploadFileDto, ratio?: Ratios) {
  //   const { filename: name, encoding, createReadStream } = file;
  //   const randomString = generateRandomString();
  //   const key = join(randomString, name);
  //   const mimetype = lookup(file.filename) as string;
  //   const buffer = await castStreamToBuffer(createReadStream());
  //   const compressedBuffer = await this.compressImage(buffer, ratio);

  //   const url = await this.s3.upload(compressedBuffer, key);

  //   return this.prisma.file.create({
  //     data: {
  //       key,
  //       name,
  //       mimetype,
  //       encoding,
  //       url,
  //     },
  //   });
  // }
}
