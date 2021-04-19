import { ApiProperty } from "@nestjs/swagger";
import { int } from "aws-sdk/clients/datapipeline";
import { Expose } from "class-transformer";
import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({ name: 'Pack'})
export default class PackEntity extends BaseEntity<PackEntity> {
    @ApiProperty()
    @Column()
    @Expose()
    name: string;

    @ApiProperty()
    @Column()
    @Expose()
    dayNumber: int;

    @ApiProperty()
    @Column()
    @Expose()
    price: int;

    @ApiProperty()
    @Column()
    @Expose()
    state: boolean;

    constructor(pack: Partial<PackEntity>){
        super(pack, PackEntity);
    }
}