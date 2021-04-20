import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from '../commons/custom-validator';
import { IsArray } from 'class-validator';

export class CreateReportDTO{
  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  content: string
}

export class ResolveReportDTO{
  @ApiProperty()
  @IsArray()
  @IsString({each: true})
  ids: string[]
}