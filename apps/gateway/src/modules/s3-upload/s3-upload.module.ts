// s3.module.ts
import { Module } from '@nestjs/common';
import { S3UploadUtil } from './s3-upload.util';

@Module({
  providers: [S3UploadUtil],
  exports: [S3UploadUtil],
})
export class S3Module {}
