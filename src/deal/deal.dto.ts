import { ApiProperty } from '@nestjs/swagger';
import DealEntity from './deal.entity';
import { IsNumber, IsString } from '../commons/custom-validator';

export class DealResponseDTO extends DealEntity {
  @ApiProperty()
  isOver: boolean;
}

export class CreateDealDTO {
  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  postID: string;
}

export class UpdateDealDTO {
  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsString()
  _id: string
}