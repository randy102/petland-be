import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HashService } from '../utils/hash/hash.service';
import BaseService from '../base/base.service';
import UserEntity, { UserRole } from './user.entity';
import { ChangePasswordDTO, ChangeUserRoleDTO, LockUserDTO, UpdateProfileDTO } from './user.dto';
import { DuplicateError, FieldError, NotFoundError } from '../commons/data.exception';
import { query } from 'express';
import { throwError } from 'rxjs';
import { Roles } from 'src/auth/roles.guard';
import { User } from './user.decorator';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(private readonly hashService: HashService) {
    super(UserEntity, 'Người dùng');
  }

  async getDetail(id: string): Promise<UserEntity>{
    return this.findOne({_id: id});
  }

  async getUserList(): Promise<UserEntity[]>{
    return this.find();
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
    if(checkDuplication){
      throw new DuplicateError('Mật khẩu');
    }
    return this.save({
      ...user,
      password: this.hashService.create(data.newPassword),
      updatedBy
    })
  }

  async changeInfo(data: UpdateProfileDTO, updatedBy: string): Promise<UserEntity>{
    const user = await this.checkExisted({_id: updatedBy});
    return this.save({
      ...user,
      phone: data.phone,
      name: data.name,
      cityID: data.city,
      districtID: data.district,
      avatar: data.avatar,
      updatedBy
    })
  }

  async lockUser(data: LockUserDTO, updatedBy: string): Promise<UserEntity>{
    const user = await this.checkExisted({_id: data.id});
    return this.save({
      ...user,
      isActive: data.isActive,
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
