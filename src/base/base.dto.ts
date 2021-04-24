import { ApiProperty } from '@nestjs/swagger';
import { IsString } from '../commons/custom-validator';
import { IsArray } from 'class-validator';

export class IdArrayDTO {
  @ApiProperty()
  @IsString({each: true})
  @IsArray()
  ids: string[];
}