import { IsNotEmpty, IsString } from '../commons/custom-validator';
import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from './user.entity';
import { IsBoolean } from 'class-validator';

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
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  city: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  district: string;

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
