import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsMobilePhone, IsNotEmpty, IsString } from '../commons/custom-validator';

export class LoginDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  password: string;
}

export class RegisterDTO  extends LoginDTO{
  @ApiProperty()
  @IsNotEmpty()
  @IsMobilePhone()
  phone: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;
}
