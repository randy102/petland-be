import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseEntity } from "src/base/base.entity";
import {Column, Entity } from "typeorm";

@Entity({name: 'Category'})
export default class CategoryEntity extends BaseEntity<CategoryEntity>{
    @ApiProperty()
    @Column()
    @Expose()
    name: string;

    constructor(category: Partial<CategoryEntity>){
        super(category, CategoryEntity);
    }
}

