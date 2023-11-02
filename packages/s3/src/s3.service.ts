import {
  Injectable,
  Inject,
  InternalServerErrorException,
} from "@nestjs/common";
import {
  S3Client,
  PutObjectCommandInput,
  PutObjectCommand,
  GetObjectCommandInput,
  GetObjectCommand,
  DeleteObjectCommandInput,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { IS3Options } from "./s3.interface";

@Injectable()
export class S3Service {
  constructor(
    @Inject("AWS_S3_OPTIONS")
    private readonly options: IS3Options
  ) {}

  private readonly S3 = new S3Client({
    region: this.options.region,
    credentials: {
      accessKeyId: this.options.accessKeyId,
      secretAccessKey: this.options.secretAccessKey,
    },
  });

  private readonly bucket = this.options.bucket;

  async getUrl(key: string): Promise<string> {
    const input: GetObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
    };

    return getSignedUrl(
      this.S3,
      new GetObjectCommand(input)
    );
  }

  async upload(
    buffer: Buffer,
    key: string
  ): Promise<string> {
    const input: PutObjectCommandInput = {
      Body: buffer,
      // ContentType: mimetype,
      Bucket: this.bucket,
      Key: key,
      // ACL: 'public-read',
    };

    try {
      await this.S3.send(new PutObjectCommand(input));

      return this.getUrl(key);
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async delete(key: string): Promise<void> {
    const input: DeleteObjectCommandInput = {
      Bucket: this.bucket,
      Key: key,
    };

    try {
      await this.S3.send(new DeleteObjectCommand(input));
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
