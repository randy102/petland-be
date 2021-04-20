import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../base/base.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

@Entity({name: 'Report'})
export default class ReportEntity extends BaseEntity<ReportEntity>{
  @ApiProperty()
  @Column()
  @Expose()
  email: string;

  @ApiProperty()
  @Column()
  @Expose()
  content: string;

  @ApiProperty()
  @Column()
  @Expose()
  resolved: boolean;

  constructor(report: Partial<ReportEntity>){
    super(report, ReportEntity);
  }
}
