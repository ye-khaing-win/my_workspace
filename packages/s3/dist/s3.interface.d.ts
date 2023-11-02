import { FactoryProvider, ModuleMetadata } from "@nestjs/common";
export declare const AWS_S3_OPTIONS = "AWS_S3_OPTIONS";
export interface IS3Options {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    bucket: string;
}
export type IS3AsyncOptions = Pick<ModuleMetadata, "imports"> & Pick<FactoryProvider<IS3Options>, "useFactory" | "inject">;
