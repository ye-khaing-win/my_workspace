import { S3Service } from '@dev/s3';
import { Injectable } from '@nestjs/common';
import { IMAGE_SIZE, MAX_WIDTH, QUALITY_ARRAY } from './constants';
import { generateRandomString } from 'src/utils/helpers';
import { join } from 'path';
import * as sharp from 'sharp';
import { Ratios } from './enums';
import { lookup } from 'mime-types';
import { ReadStream } from 'fs';
import { Readable } from 'stream';

@Injectable()
export class StorageService {
  constructor(private readonly s3: S3Service) {}

  private async castStreamToBuffer(stream: Readable): Promise<Buffer> {
    const buffer: Uint8Array[] = [];

    return new Promise((resolve, reject) =>
      stream
        .on('error', (error) => reject(error))
        .on('data', (data) => buffer.push(data))
        .on('end', () => resolve(Buffer.concat(buffer)))
    );
  }

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

  async uploadImage(
    file: { filename: string; encoding: string; createReadStream: () => ReadStream },
    ratio?: Ratios
  ) {
    const { filename: name, encoding, createReadStream } = file;
    const randomString = generateRandomString();
    const key = join(randomString, name);
    const mimetype = lookup(file.filename) as string;
    const buffer = await this.castStreamToBuffer(createReadStream());
    const compressedBuffer = await this.compressImage(buffer, ratio);

    const url = await this.s3.upload(compressedBuffer, key);

    return {
      key,
      name,
      mimetype,
      encoding,
      url,
    };
  }
}
