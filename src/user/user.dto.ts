import { IsNotEmpty, IsString } from '../commons/custom-validator';
import { ApiProperty } from '@nestjs/swagger';
import UserEntity, { UserRole } from './user.entity';
import { IsArray, IsMobilePhone } from 'class-validator';

export class ChangeUserRoleDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;
  
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  role: UserRole;
}

export class UpdateProfileDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  avatar: string;
}

export class ChangePasswordDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}


export class LockUserDTO{
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  isActive: boolean;
}

export class DeleteUserDTO {
  @ApiProperty()
  @IsString({each: true})
  @IsArray()
  ids: string[];
}

export class UserResponseDTO extends UserEntity{

}