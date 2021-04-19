import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'District'})
export default class DistrictEntity extends BaseEntity<DistrictEntity> {
    @ApiProperty()
    @Column()
    @Expose()
    name: string;

    @ApiProperty()
    @Column()
    @Expose()
    cityID: string;

    constructor(district: Partial<DistrictEntity>){
        super(district, DistrictEntity);
    }
}
