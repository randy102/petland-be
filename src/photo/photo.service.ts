import { Injectable } from '@nestjs/common';
import AWS = require('aws-sdk');
import { File } from './photo.type';
import { HashService } from '../utils/hash/hash.service';

@Injectable()
export class PhotoService {
  private readonly ID = process.env.S3_ID;
  private readonly SECRET = process.env.S3_SECRET;
  private readonly BUCKET_NAME = process.env.S3_BUCKET;
  private readonly S3: AWS.S3;
  private readonly DEFAULT_PHOTOS = ['default-avatar', 'default-brand'];
  constructor(private readonly hashService: HashService) {
    this.S3 = new AWS.S3({
      accessKeyId: this.ID,
      secretAccessKey: this.SECRET,
    });
  }

  save(file: File): Promise<string> {
    const id = this.hashService.rand();
    const params: AWS.S3.PutObjectRequest = {
      Bucket: this.BUCKET_NAME,
      Key: id,
      Body: file.buffer,
    };
    return new Promise((resolve) => {
      this.S3.upload(params, (err, data) => {
        if (err) throw Error('Upload S3 fail! ' + err.message);
        console.log(`File uploaded successfully. ${data.Location}`);
        resolve(id);
      });
    });
  }

  remove(id: string): Promise<boolean> {
    const params = {
      Bucket: this.BUCKET_NAME,
      Key: id,
    };
    return new Promise((resolve) => {
      if (this.DEFAULT_PHOTOS.some((p) => p === id)) resolve(false);

      this.S3.deleteObject(params, (err) => {
        if (err) throw Error('Delete Object fail: ' + err.message);
        console.log(`File deleted successfully. ${id}`);
        resolve(true);
      });
    });
  }
}
