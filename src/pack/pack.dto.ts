import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class PackDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    dayNumber: number;

    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    price: number;
}

export class UpdatePackDTO extends PackDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;
}
