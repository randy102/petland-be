import { ApiProperty } from "@nestjs/swagger";
import { IsArray } from "class-validator";
import { IsString, IsNotEmpty } from "src/commons/custom-validator";

export class CategoryDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class UpdateCategoryDto{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    id: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    newName: string;
}

export class DeleteCategoryDto{
    @ApiProperty()
    @IsString({each: true})
    @IsArray()
    ids: string[];
}
