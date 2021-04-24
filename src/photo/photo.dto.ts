import { ApiProperty } from '@nestjs/swagger';
import { IsString } from '../commons/custom-validator';

export class PhotoUploadDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;
}

export class PhotoUpdateDto {
  @ApiProperty({ type: 'string', format: 'binary' })
  file: any;

  @ApiProperty()
  @IsString()
  id: string
}
