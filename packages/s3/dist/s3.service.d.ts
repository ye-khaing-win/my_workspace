/// <reference types="node" />
import { IS3Options } from "./s3.interface";
export declare class S3Service {
    private readonly options;
    constructor(options: IS3Options);
    private readonly S3;
    private readonly bucket;
    getUrl(key: string): Promise<string>;
    upload(buffer: Buffer, key: string): Promise<string>;
    delete(key: string): Promise<void>;
}
