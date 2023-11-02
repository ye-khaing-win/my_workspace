import { DynamicModule } from "@nestjs/common";
import { IS3AsyncOptions, IS3Options } from "./s3.interface";
export declare class S3Module {
    static register(options: IS3Options): DynamicModule;
    static registerAsync(options: IS3AsyncOptions): DynamicModule;
}
