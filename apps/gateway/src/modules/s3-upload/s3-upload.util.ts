import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Injectable } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class S3UploadUtil {
  private s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  private slugify(text: string): string {
    return text
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '') // bỏ dấu
      .replace(/đ/g, 'd')
      .replace(/Đ/g, 'd')
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '') // bỏ ký tự đặc biệt
      .replace(/\s+/g, '-') // khoảng trắng -> -
      .replace(/-+/g, '-') // gộp nhiều dấu - liên tiếp
      .replace(/^-+|-+$/g, ''); // xoá - ở đầu/cuối
  }

  public generateImageKey(prefix: string): string {
    // const slug = this.slugify(name);
    const uuid = randomUUID();
    return `${prefix}/${uuid}`;
  }

  async uploadImage(file: Express.Multer.File, key: string) {
    const uploadParams = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    try {
      await this.s3.send(new PutObjectCommand(uploadParams));
      return `${process.env.AWS_S3_BASE_URL}${key}`;
    } catch (error) {
      console.log(error);
    }
  }
}
