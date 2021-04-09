import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { Column } from "typeorm";
import CommentEntity from "./comment.entity";

export class CreateCommentDTO extends CommentEntity{}

export class EditCommentDTO{
    @ApiProperty()
    @Column()
    @Expose()
    id: string;

    @ApiProperty()
    @Column()
    @Expose()
    newDetail: string;
}

export class CommentResponseDTO extends CreateCommentDTO{
    @ApiProperty()
    qa: string;

    @ApiProperty()
    createdName: string;
}