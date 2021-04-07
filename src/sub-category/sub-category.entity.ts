import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({name: 'SubCategory'})
export default class SubCategoryEntity extends BaseEntity<SubCategoryEntity>{
    @ApiProperty()
    @Column()
    @Expose()
    name: string;

    @ApiProperty()
    @Column()
    @Expose()
    categoryID: string;

    constructor(subCategory: Partial<SubCategoryEntity>) {
        super(subCategory, SubCategoryEntity);
      }
}