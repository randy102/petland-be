import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseEntity } from "src/base/base.entity";
import { Column, Entity } from "typeorm";

@Entity({name: 'Comment'})
export default class CommentEntity extends BaseEntity<CommentEntity>{
    @ApiProperty()
    @Column()
    @Expose()
    detail: string;

    @ApiProperty()
    @Column()
    @Expose()
    qaID: string;

    constructor(Comment: Partial<CommentEntity>){
        super(Comment, CommentEntity);
    }
}
