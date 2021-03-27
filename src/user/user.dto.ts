import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class UpdateProfileDTO {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsString()
  city: string;

  @IsString()
  district: string;

  @IsString()
  avatar: string;
}

export class ChangePasswordDTO {
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @IsString()
  @IsNotEmpty()
  newPassword: string;
}
