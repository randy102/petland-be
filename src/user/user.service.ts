import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HashService } from '../utils/hash/hash.service';
import BaseService from '../base/base.service';
import UserEntity, { UserRole } from './user.entity';
import { ChangePasswordDTO, ChangeUserRoleDTO } from './user.dto';
import { FieldError } from '../commons/data.exception';
import { query } from 'express';
import { throwError } from 'rxjs';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(private readonly hashService: HashService) {
    super(UserEntity, 'Người dùng');
  }

  async getDetail(id: string): Promise<UserEntity>{
    return this.findOne({_id: id});
  }

  async changeRole(data: ChangeUserRoleDTO, updatedBy: string): Promise<UserEntity> {
    const user = await this.checkExisted({ _id: data.id });
    const removeAdmin = user.role === UserRole.ADMIN && data.role !== UserRole.ADMIN;
    if (removeAdmin) {
      await this.ensureHasAdmin();
    }
    if (!(data.role in UserRole)) {
      throw new FieldError('Vai trò');
    }
    return this.save({
      ...user,
      role: data.role,
      updatedBy
    });
  }

  async changePassWord(data: ChangePasswordDTO, updatedBy: string): Promise<UserEntity> {
    const user = await this.checkExisted({ _id: updatedBy });
    const checkDuplication = data.newPassword === data.oldPassword;
    if(user == null){
      throw new HttpException(
        'Không tìm thấy tài khoản',
        HttpStatus.NOT_FOUND
      )
    }
    if(checkDuplication){
      throw new HttpException(
        'Mật khẩu mới không được trùng mật khẩu cũ',
        256
      );
    }
    return this.save({
      ...user,
      password: this.hashService.create(data.newPassword),
      updatedBy
    })
  }

  private async ensureHasAdmin() {
    const admins = await this.find({ role: UserRole.ADMIN });
    if (admins.length < 2) {
      throw new HttpException(
        'Hệ thống phải có ít nhất 1 Admin',
        HttpStatus.BAD_GATEWAY
      );
    }
  }
}
