import { Injectable } from '@nestjs/common';
import md5 = require('md5');
import shortId = require('shortid');

@Injectable()
export class HashService {
  private static limit(hashed: string, limit: number) {
    return limit ? hashed.slice(0, limit) : hashed;
  }

  create(subject: string, size?: number) {
    return HashService.limit(md5(subject), size);
  }

  rand(size?: number) {
    return HashService.limit(shortId.generate(), size);
  }
}
