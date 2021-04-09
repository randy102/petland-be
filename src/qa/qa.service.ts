import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import BaseService from "src/base/base.service";
import { joinMany2One, match, set } from "src/utils/mongo/aggregate-tools";
import { PostService } from "../post/post.service";
import { CreateQaDTO, EditQaDTO, QaResponseDTO } from "./qa.dto";
import QaEntity from "./qa.entity";


@Injectable()
export class QaService extends BaseService<QaEntity>{
    constructor(
      private readonly postService: PostService,
      ) {
        super(QaEntity, 'Câu hỏi, trả lời');
      }

    async createQa(data: CreateQaDTO, createdBy: string): Promise<QaEntity>{
        await this.postService.checkExisted({_id: data.postID});
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

    async deleteQa(id: string, userId: string): Promise<Boolean>{
      const qa = await this.checkExisted({ _id: id});
      if(!(userId == qa.createdBy)){
        throw new HttpException("Chỉ có người tạo được quyền xóa", HttpStatus.BAD_REQUEST)
      }
      return this.delete([id]);
    }
}
