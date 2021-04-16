import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsArray } from "class-validator";
import { IsString } from "src/commons/custom-validator";
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
export class DeleteCommentDto{
    @ApiProperty()
    @IsString({each: true})
    @IsArray()
    ids: string[];
}