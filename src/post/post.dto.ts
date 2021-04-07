import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsBoolean, IsNumber } from 'src/commons/custom-validator';
import PostEntity, { PetSex } from './post.entity';
import { IsArray, IsEnum } from 'class-validator';

export class CreatePostDTO{
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    categoryID: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    subCategoryID: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    cityID: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    districtID: string;

    @ApiProperty()
    detail: string;

    @ApiProperty()
    @IsEnum(PetSex)
    sex: PetSex;

    @ApiProperty()
    @IsBoolean()
    vaccination: boolean

    @ApiProperty()
    @IsBoolean()
    age: boolean

    @ApiProperty()
    @IsNumber()
    price: number

    @ApiProperty()
    @IsString()
    origin: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    mainImage: string

    @ApiProperty()
    @IsArray()
    @IsString({each: true})
    images: string[]
}

export class UpdatePostDTO extends CreatePostDTO {
    @ApiProperty()
    id: string;
}

export class PostResponseDTO extends PostEntity {
    @ApiProperty()
    category: string;

    @ApiProperty()
    subCategory: string;

    @ApiProperty()
    city: string;

    @ApiProperty()
    district: string;

    @ApiProperty()
    createdName: string;

}