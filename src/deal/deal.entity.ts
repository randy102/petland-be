import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { int } from 'aws-sdk/clients/datapipeline';

@Entity({ name: 'Deal' })
export default class DealEntity extends BaseEntity<DealEntity> {
  @ApiProperty()
  @Column()
  @Expose()
  price: number;

  @ApiProperty()
  @Column()
  @Expose()
  postID: string;

  @ApiProperty()
  @Column()
  @Expose()
  isAccepted: boolean

  constructor(pack: Partial<DealEntity>) {
    super(pack, DealEntity);
  }
}