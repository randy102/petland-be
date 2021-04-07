import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HashService } from '../utils/hash/hash.service';
import BaseService from '../base/base.service';
import UserEntity, { UserRole } from './user.entity';
import { ChangePasswordDTO, ChangeUserRoleDTO, LockUserDTO, UpdateProfileDTO, UserResponseDTO } from './user.dto';
import { DuplicateError, FieldError } from '../commons/data.exception';
import { join, match, set, unwind } from '../utils/mongo/aggregate-tools';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(private readonly hashService: HashService) {
    super(UserEntity, 'Người dùng');
  }

  async getDetail(id: string): Promise<UserResponseDTO> {
    await this.checkExisted({ _id: id });
    return (await this.aggregate([
      match({_id: id}),
      join('District','districtID','_id','district'),
      unwind('$district'),
      join('City','cityID','_id','city'),
      unwind('$$city')
    ]))[0];
  }

  async getUsers(): Promise<UserResponseDTO[]> {
    return await this.aggregate([
      join('District','districtID','_id','district'),
      unwind('$district'),
      join('City','cityID','_id','city'),
      unwind('$$city'),
      set({city: '$city.name'})
    ]);
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
    if (checkDuplication) {
      throw new DuplicateError('Mật khẩu');
    }
    return this.save({
      ...user,
      password: this.hashService.create(data.newPassword),
      updatedBy
    });
  }

  async changeInfo(data: UpdateProfileDTO, updatedBy: string): Promise<UserEntity> {
    const user = await this.checkExisted({ _id: updatedBy });
    return this.save({
      ...user,
      phone: data.phone,
      name: data.name,
      cityID: data.city,
      districtID: data.district,
      avatar: data.avatar,
      updatedBy
    });
  }

  async lockUser(data: LockUserDTO, updatedBy: string): Promise<UserEntity> {
    const user = await this.checkExisted({ _id: data.id });
    return this.save({
      ...user,
      isActive: data.isActive,
      updatedBy
    });
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
