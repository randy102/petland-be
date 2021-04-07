import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "src/commons/custom-validator";
import SubCategoryEntity from "./sub-category.entity";

export class SubCategoryDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    categoryID: string;

}

export class UpdateSubCategoryDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    newName: string;
}

export class SubCategoryResponseDTO extends SubCategoryEntity{
    @ApiProperty()
    category: string;
}