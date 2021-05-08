import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsArray } from 'class-validator';
import { IsNotEmpty, IsString } from 'src/commons/custom-validator';
import { Column } from 'typeorm';
import QaEntity from './qa.entity';
import CommentEntity from '../comment/comment.entity';

export class CreateQaDTO extends QaEntity {
}

export class QaResponseDTO extends CreateQaDTO {
  @ApiProperty()
  post: string;

  @ApiProperty()
  createdName: string;

  @ApiProperty()
  comments: CommentEntity[];
}

export class EditQaDTO {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  newDetail: string;
}

export class DeleteQaDto {
  @ApiProperty()
  @IsString({ each: true })
  @IsArray()
  ids: string[];
}


