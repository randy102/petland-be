import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({name: 'Ads'})
export default class AdsEntity extends BaseEntity<AdsEntity>{
    @ApiProperty()
    @Column()
    @Expose()
    partner: string;

    @ApiProperty()
    @Column()
    @Expose()
    url: string;

    @ApiProperty()
    @Column()
    @Expose()
    fileID: string;

    @ApiProperty()
    @Column()
    @Expose()
    position: string;

    constructor(ads: Partial<AdsEntity>){
        super(ads, AdsEntity);
    }
}