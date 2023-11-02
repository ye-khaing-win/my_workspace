import { Module, DynamicModule } from "@nestjs/common";
import { S3Service } from "./s3.service";
import {
  AWS_S3_OPTIONS,
  IS3AsyncOptions,
  IS3Options,
} from "./s3.interface";

@Module({
  providers: [S3Service],
  exports: [S3Service],
})
export class S3Module {
  static register(options: IS3Options): DynamicModule {
    return {
      module: S3Module,
      providers: [
        {
          provide: AWS_S3_OPTIONS,
          useValue: options,
        },
        S3Service,
      ],
      exports: [S3Service],
    };
  }

  static registerAsync(
    options: IS3AsyncOptions
  ): DynamicModule {
    return {
      module: S3Module,
      imports: options.imports,
      providers: [
        {
          provide: AWS_S3_OPTIONS,
          useFactory: options.useFactory,
          inject: options.inject,
        },
        S3Service,
      ],
      exports: [S3Service],
    };
  }
}
