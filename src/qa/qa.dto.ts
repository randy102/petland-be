import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "src/commons/custom-validator";
import { Column } from "typeorm";
import QaEntity from "./qa.entity";

export class CreateQaDTO extends QaEntity{}

export class QaResponseDTO extends CreateQaDTO{
    @ApiProperty()
    post: string;

    @ApiProperty()
    createdName: string;
}

export class EditQaDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    newDetail: string;
}


