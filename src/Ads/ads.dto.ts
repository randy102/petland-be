import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Column } from "typeorm";
import AdsEntity from "./ads.entity";

export class AdsDto{
    @ApiProperty()
    @Column()
    @Expose()
    partner: string;

    @ApiProperty()
    @Column()
    @Expose()
    url: string;

    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;

    @ApiProperty()
    @Column()
    @Expose()
    location: string;
}