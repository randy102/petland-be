import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseEntity } from "src/base/base.entity";
import {Column, Entity } from "typeorm";

export enum PetSex {
    MALE = 'MALE',
    FEMALE = 'FEMALE'
}

export enum PostStatus {
    DRAFT = 'DRAFT',
    PENDING = 'PENDING',
    PUBLISHED = 'PUBLISHED',
    REJECTED = 'REJECTED',
    HIDDEN = 'HIDDEN'
}

@Entity({name: 'Post'})
export default class PostEntity extends BaseEntity<PostEntity>{
    @ApiProperty()
    @Column()
    @Expose()
    name: string;

    @ApiProperty()
    @Column()
    @Expose()
    categoryID: string;

    @ApiProperty()
    @Column()
    @Expose()
    subCategoryID: string;

    @ApiProperty()
    @Column()
    @Expose()
    cityID: string;

    @ApiProperty()
    @Column()
    @Expose()
    districtID: string;

    @ApiProperty()
    @Column()
    @Expose()
    detail: string;

    @ApiProperty()
    @Column()
    @Expose()
    sex: PetSex;

    @ApiProperty()
    @Column()
    @Expose()
    vaccination: boolean

    @ApiProperty()
    @Column()
    @Expose()
    age: number

    @ApiProperty()
    @Column()
    @Expose()
    price: number

    @ApiProperty()
    @Column()
    @Expose()
    origin: string

    @ApiProperty()
    @Column()
    @Expose()
    mainImage: string

    @ApiProperty()
    @Column()
    @Expose()
    images: string[]

    @ApiProperty()
    @Column()
    @Expose()
    state: PostStatus;

    @ApiProperty()
    @Column()
    @Expose()
    rejectedReason: string

    @ApiProperty()
    @Column()
    @Expose()
    highlightExpired: number

    @ApiProperty()
    @Column()
    @Expose()
    auctionExpired:number

    constructor(post: Partial<PostEntity>){
        super(post, PostEntity);
    }
}

