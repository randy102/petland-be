import { BaseEntity } from '../base/base.entity';
import { Column, Entity } from 'typeorm';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Entity({name: 'PointTransaction'})
export default class PointTransactionEntity extends BaseEntity<PointTransactionEntity>{
  @Column()
  @Expose()
  @ApiProperty()
  userID: string

  @Column()
  @Expose()
  @ApiProperty()
  amount: number

  @Column()
  @Expose()
  @ApiProperty()
  description: string



  constructor(transaction: Partial<PointTransactionEntity>) {
    super(transaction, PointTransactionEntity);

  }

}