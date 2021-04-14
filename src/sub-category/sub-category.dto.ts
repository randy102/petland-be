import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { IsNotEmpty, IsString } from "src/commons/custom-validator";
import SubCategoryEntity from "./sub-category.entity";

export class SubCategoryDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    categoryID: string;

}

export class UpdateSubCategoryDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    categoryID: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    newName: string;
}

export class SubCategoryResponseDTO extends SubCategoryEntity{
    @ApiProperty()
    category: string;
}

export class DeleteSubCategoryDto{
    @ApiProperty()
    @IsString({each: true})
    @IsArray()
    ids: string[];
}