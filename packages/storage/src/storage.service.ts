import { Injectable } from "@nestjs/common";
import * as sharp from "sharp";

export const MAX_WIDTH = 2160;
export const QUALITY_ARRAY = [
  90, 80, 75, 70, 65, 60, 55, 50, 45, 40, 35, 30, 25, 20,
  15, 10,
];
export const IMAGE_SIZE = 256000;

@Injectable()
export class StorageService {
  async compressImage(
    buffer: Buffer,
    ratio?: number
  ): Promise<Buffer> {
    let compressedBuffer: sharp.Sharp | Buffer = sharp(
      buffer
    ).jpeg({
      mozjpeg: true,
      chromaSubsampling: "4:4:4",
    });

    if (ratio) {
      compressedBuffer.resize({
        width: MAX_WIDTH,
        height: Math.round(MAX_WIDTH * ratio),
        fit: "cover",
      });
    }

    compressedBuffer = await compressedBuffer.toBuffer();

    if (compressedBuffer.length > IMAGE_SIZE) {
      for (let i = 0; i < QUALITY_ARRAY.length; i++) {
        const quality = QUALITY_ARRAY[i];
        const smallerBuffer = await sharp(compressedBuffer)
          .jpeg({
            quality,
            chromaSubsampling: "4:4:4",
          })
          .toBuffer();

        if (
          smallerBuffer.length <= IMAGE_SIZE ||
          quality === 10
        ) {
          compressedBuffer = smallerBuffer;
          break;
        }
      }
    }

    return compressedBuffer;
  }
}
