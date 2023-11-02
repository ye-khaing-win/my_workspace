"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.S3Service = void 0;
const common_1 = require("@nestjs/common");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let S3Service = class S3Service {
    constructor(options) {
        this.options = options;
        this.S3 = new client_s3_1.S3Client({
            region: this.options.region,
            credentials: {
                accessKeyId: this.options.accessKeyId,
                secretAccessKey: this.options.secretAccessKey,
            },
        });
        this.bucket = this.options.bucket;
    }
    async getUrl(key) {
        const input = {
            Bucket: this.bucket,
            Key: key,
        };
        return (0, s3_request_presigner_1.getSignedUrl)(this.S3, new client_s3_1.GetObjectCommand(input));
    }
    async upload(buffer, key) {
        const input = {
            Body: buffer,
            Bucket: this.bucket,
            Key: key,
        };
        try {
            await this.S3.send(new client_s3_1.PutObjectCommand(input));
            return this.getUrl(key);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
    async delete(key) {
        const input = {
            Bucket: this.bucket,
            Key: key,
        };
        try {
            await this.S3.send(new client_s3_1.DeleteObjectCommand(input));
        }
        catch (error) {
            throw new common_1.InternalServerErrorException(error.message);
        }
    }
};
S3Service = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)("AWS_S3_OPTIONS")),
    __metadata("design:paramtypes", [Object])
], S3Service);
exports.S3Service = S3Service;
//# sourceMappingURL=s3.service.js.map