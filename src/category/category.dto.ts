import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { IsString, IsNotEmpty } from "src/commons/custom-validator";

export class CategoryDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class UpdateCategoryDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    newName: string;
}

export class DeleteCategoryDTO{
    @ApiProperty()
    @IsString({each: true})
    @IsArray()
    ids: string[];
}
