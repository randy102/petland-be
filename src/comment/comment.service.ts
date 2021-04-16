import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import BaseService from "src/base/base.service";
import { QaService } from "src/qa/qa.service";
import { joinMany2One, match } from "src/utils/mongo/aggregate-tools";
import { CommentResponseDTO, CreateCommentDTO, DeleteCommentDto, EditCommentDTO } from "./comment.dto";
import CommentEntity from "./comment.entity";


@Injectable()
export class CommentService extends BaseService<CommentEntity>{
    constructor( 
        @Inject(forwardRef(() => QaService))
        private readonly qaService: QaService) {
          super(CommentEntity, 'Bình luận');
    }

    async createComment(data: CreateCommentDTO, createdBy: string): Promise<CommentEntity>{
        await this.qaService.checkExisted({_id: data.qaID});
        return this.save({
            ...data,
            createdBy
        })
    }

    async comments(id: string): Promise<CommentResponseDTO[]>{
        await this.checkExisted({qaID: id});
        return await this.aggregate([
          match({ qaID: id }),
          ...joinMany2One('Qa', 'qaID', '_id', 'qa','detail'),
          ...joinMany2One('User', 'createdBy', '_id', 'createdName','name'),
        ])
      }

    async editComment(data: EditCommentDTO, updatedBy: string): Promise<CommentEntity>{
        const comment = await this.checkExisted({ _id: data.id});
        if(!(updatedBy == comment.createdBy)){
            throw new HttpException("Chỉ có người tạo được quyền chỉnh sửa", HttpStatus.BAD_REQUEST)
        }
        return this.save({
            ...comment,
            detail: data.newDetail,
            updatedBy
        })
    }

    async deleteComment(data: DeleteCommentDto, userID: string): Promise<Boolean>{
        const comments = await this.checkExistedIds(data.ids);
        
        for(let comment of comments){
            if(!(userID == comment.createdBy)){
                throw new HttpException("Chỉ có người tạo được quyền xóa", HttpStatus.BAD_REQUEST);
            }
        }
        return this.delete(data.ids);
    }    

}
