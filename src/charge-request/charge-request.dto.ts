import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsNumber, IsString } from '../commons/custom-validator';
import ChargeRequestEntity from './charge-request.entity';
import { IdArrayDTO } from '../base/base.dto';

export class CreateChargeRequestDTO{
  @ApiProperty()
  @IsMobilePhone()
  phone: string

  @ApiProperty()
  @IsNumber()
  amount: number
}

export class ChargeRequestResponseDTO extends ChargeRequestEntity{
  @ApiProperty()
  createdName: string
}

export class ConfirmChargeRequestDTO extends IdArrayDTO{

}

export class RejectChargeRequestDTO {
  @ApiProperty()
  @IsString()
  id: string

  @ApiProperty()
  @IsString()
  rejectedReason: string
}
