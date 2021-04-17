import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsArray, IsNotEmpty } from "class-validator";
import { IsString } from "src/commons/custom-validator";
import { Column } from "typeorm";
import AdsEntity from "./ads.entity";


export class AdsDTO{
    
    @ApiProperty()
    @Column()
    @Expose()
    partner: string;

    @ApiProperty({ format: 'binary' })
    file: string;

    @ApiProperty()
    @Column()
    @Expose()
    position: string;
    
    @ApiProperty()
    @Column()
    @Expose()
    url: string;
}
export class UpdateAdsDTO extends AdsDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @Column()
    @Expose()
    fileID: string;
}

export class DeleteAdsDTO{
    @ApiProperty()
    @IsString({each: true})
    @IsNotEmpty()
    ids: string[];
}