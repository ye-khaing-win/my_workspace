import { IsString, IsMimeType } from 'class-validator';
import { ReadStream } from 'fs';

export class UploadFileDto {
  @IsString()
  public filename!: string;

  @IsString()
  @IsMimeType()
  public mimetype!: string;

  @IsString()
  public encoding!: string;

  public createReadStream: () => ReadStream;
}
