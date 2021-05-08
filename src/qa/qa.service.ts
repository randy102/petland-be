import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import BaseService from 'src/base/base.service';
import { CommentService } from 'src/comment/comment.service';
import { NotificationService } from 'src/notification/notification.service';
import { join, joinMany2One, match, set, unwind } from 'src/utils/mongo/aggregate-tools';
import { PostService } from '../post/post.service';
import { CreateQaDTO, DeleteQaDto, EditQaDTO, QaResponseDTO } from './qa.dto';
import QaEntity from './qa.entity';


@Injectable()
export class QaService extends BaseService<QaEntity> {
  constructor(
    @Inject(forwardRef(() => PostService))
    private readonly postService: PostService,
    @Inject(forwardRef(() => CommentService))
    private readonly commentService: CommentService,
    @Inject(forwardRef(() => NotificationService))
    private readonly notificationService: NotificationService
  ) {
    super(QaEntity, 'Câu hỏi');
  }

  async createQa(data: CreateQaDTO, createdBy: string): Promise<QaEntity> {
    await this.postService.checkExisted({ _id: data.postID });
    const qa = await this.save({
      ...data,
      createdBy
    });
    this.notificationService.createNotificationQa(qa);
    return qa;
  }

  async qaList(id: string): Promise<QaResponseDTO[]> {
    await this.postService.checkExistedId(id);
    return await this.aggregate([
      // match({ postID: id }),
      join('Comment', '_id', 'qaID', 'comments'),
      ...joinMany2One('Post', 'postID', '_id', 'post', 'name'),
      ...joinMany2One('User', 'createdBy', '_id', 'createdName', 'name'),
      unwind('$comments'),
      ...joinMany2One('User', 'createdBy', '_id', 'comments.createdName', 'name'),
      {
        $group: {
          '_id': '$_id',
          'detail': { '$first': '$detail' },
          'createdName': { '$first': '$createdName' },
          'comments': {
            '$push': '$comments'
          }
        }
      }
    ]);
  }

  async editQa(data: EditQaDTO, updatedBy: string): Promise<QaEntity> {
    const qa = await this.checkExisted({ _id: data.id });
    if (!(updatedBy == qa.createdBy)) {
      throw new HttpException('Chỉ có người tạo được quyền chỉnh sửa', HttpStatus.BAD_REQUEST);
    }
    return this.save({
      ...qa,
      detail: data.newDetail,
      updatedBy
    });
  }

  async deleteQa(data: DeleteQaDto, userId: string): Promise<Boolean> {
    const qas = await this.checkExistedIds(data.ids);
    var ids: string[] = [];

    for (let qa of qas) {
      if (!(userId == qa.createdBy)) {
        throw new HttpException('Chỉ có người tạo được quyền xóa', HttpStatus.BAD_REQUEST);
      }
      let comments = await this.commentService.find({ qaID: qa._id });
      for (let comment of comments) {
        ids.push(comment._id);
      }
    }
    console.log(ids);

    return this.delete(data.ids) && this.commentService.delete(ids);
  }
}
