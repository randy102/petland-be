import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'City' })
export default class CityEntity extends BaseEntity<CityEntity> {
  @ApiProperty()
  @Column()
  @Expose()
  name: string;

  constructor(city: Partial<CityEntity>) {
    super(city, CityEntity);
  }
}