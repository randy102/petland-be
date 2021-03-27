import { Injectable } from '@nestjs/common';
import { HashService } from '../utils/hash/hash.service';
import BaseService from '../base/base.service';
import UserEntity from './user.entity';


@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(
    private readonly hashService: HashService,
  ) {
    super(UserEntity, 'Người dùng');
  }


}
