import { ApiProperty } from "@nestjs/swagger";
import { int } from "aws-sdk/clients/datapipeline";
import { IsInt, IsNotEmpty, IsString } from "class-validator";
import { Column } from "typeorm";

export class PackDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    dayNumber: int;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    price: int;
}

export class UpdatePackDTO extends PackDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;
}
