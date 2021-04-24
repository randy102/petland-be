import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import BaseService from "src/base/base.service";
import { CommentService } from "src/comment/comment.service";
import { NotificationService } from "src/notification/notification.service";
import { joinMany2One, match, set } from "src/utils/mongo/aggregate-tools";
import { PostService } from "../post/post.service";
import { CreateQaDTO, DeleteQaDto, EditQaDTO, QaResponseDTO } from "./qa.dto";
import QaEntity from "./qa.entity";


@Injectable()
export class QaService extends BaseService<QaEntity>{
    constructor(
      private readonly postService: PostService,
      @Inject(forwardRef(() => CommentService))
      private readonly commentService: CommentService,
      @Inject(forwardRef(() => NotificationService))
        private readonly notificationService: NotificationService,
      ) {
        super(QaEntity, 'Câu hỏi');
      }

    async createQa(data: CreateQaDTO, createdBy: string): Promise<QaEntity>{
        await this.postService.checkExisted({_id: data.postID});
        await this.notificationService.createNotificationQa(data.postID);
        return this.save({
            ...data,
            createdBy
        })
    }

    async qaList(id: string): Promise<QaResponseDTO[]>{
      await this.checkExisted({postID: id});
      return await this.aggregate([
        match({ postID: id }),
        ...joinMany2One('Post', 'postID', '_id', 'post','name'),
        ...joinMany2One('User', 'createdBy', '_id', 'createdName','name'),
      ])
    }

    async editQa(data: EditQaDTO, updatedBy: string): Promise<QaEntity>{
      const qa = await this.checkExisted({_id: data.id});
      if(!(updatedBy == qa.createdBy)){
        throw new HttpException("Chỉ có người tạo được quyền chỉnh sửa", HttpStatus.BAD_REQUEST)
      }
      return this.save({
        ...qa,
        detail: data.newDetail,
        updatedBy
      })
    }

    async deleteQa(data: DeleteQaDto, userId: string): Promise<Boolean>{
      const qas = await this.checkExistedIds(data.ids);
      var ids: string[] = [];
      
      for(let qa of qas){
        if(!(userId == qa.createdBy)){
          throw new HttpException("Chỉ có người tạo được quyền xóa", HttpStatus.BAD_REQUEST)
        }
        let comments = await this.commentService.find({qaID: qa._id});
       for(let comment of comments){
          ids.push(comment._id);
       }
      }
      console.log(ids);

      return this.delete(data.ids) && this.commentService.delete(ids);
    }
}
