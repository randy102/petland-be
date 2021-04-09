import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HashService } from '../utils/hash/hash.service';
import BaseService from '../base/base.service';
import UserEntity, { UserRole } from './user.entity';
import { ChangePasswordDTO, ChangeUserRoleDTO, DeleteUserDTO, LockUserDTO, UpdateProfileDTO, UserResponseDTO } from './user.dto';
import { DuplicateError, FieldError } from '../commons/data.exception';

@Injectable()
export class UserService extends BaseService<UserEntity> {
  constructor(private readonly hashService: HashService) {
    super(UserEntity, 'Người dùng');
  }

  async getDetail(id: string): Promise<UserResponseDTO> {
    return this.checkExisted({ _id: id });
  }

  async getUsers(): Promise<UserResponseDTO[]> {
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
      ...data,
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

  async deleteUsers(body: DeleteUserDTO): Promise<boolean> {
    await this.checkExistedIds(body.ids);
    return this.delete(body.ids);
  }
}
