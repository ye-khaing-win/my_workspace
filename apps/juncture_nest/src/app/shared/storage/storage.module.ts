import { Global, Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { S3Module } from '@dev/s3';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'src/app/core/enums';

@Global()
@Module({
  imports: [
    S3Module.registerAsync({
      useFactory: (config: ConfigService) => {
        return {
          region: config.get<string>(EnvVariables.AWS_BUCKET_REGION),
          accessKeyId: config.get<string>(EnvVariables.AWS_ACCESS_KEY),
          secretAccessKey: config.get<string>(EnvVariables.AWS_SECRET_KEY),
          bucket: config.get<string>(EnvVariables.AWS_BUCKET_NAME),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}
