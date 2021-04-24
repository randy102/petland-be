import { BaseEntity } from '../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity } from 'typeorm';
import { Expose } from 'class-transformer';

export enum ChargeRequestState{
  DONE = 'DONE',
  FAILED = 'FAILED',
  PENDING = 'PENDING'
}

@Entity({name: 'ChargeRequest'})
export default class ChargeRequestEntity extends BaseEntity<ChargeRequestEntity>{
  @ApiProperty()
  @Column()
  @Expose()
  code: string

  @ApiProperty()
  @Column()
  @Expose()
  state: ChargeRequestState;

  @ApiProperty()
  @Column()
  @Expose()
  amount: number

  @ApiProperty()
  @Column()
  @Expose()
  phone: string

  @ApiProperty()
  @Column()
  @Expose()
  rejectedReason: string

  constructor(chargeRequest: Partial<ChargeRequestEntity>){
    super(chargeRequest, ChargeRequestEntity);
  }
}