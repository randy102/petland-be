import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';
import { IsString } from '../commons/custom-validator';

export class ReadNotificationDTO {
  @ApiProperty()
  @IsArray()
  @IsString({ each: true })
  ids: string[];
}