import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { isRFC3339 } from 'class-validator';
import BaseService from 'src/base/base.service';
import { PostService } from 'src/post/post.service';
import { QaService } from 'src/qa/qa.service';
import { UserService } from 'src/user/user.service';
import NotificationEntity from './notification.entity';
import QaEntity from '../qa/qa.entity';
import CommentEntity from '../comment/comment.entity';
import PostEntity from '../post/post.entity';

@Injectable()
export class NotificationService extends BaseService<NotificationEntity> {
  constructor(
    private readonly userService: UserService,
    private readonly postService: PostService,
    @Inject(forwardRef(() => QaService))
    private readonly qaService: QaService
  ) {
    super(NotificationEntity, 'Thông báo');
  }

  async listNotification(id: string): Promise<NotificationEntity[]> {
    const notifications = await this.find({ userID: id, read: false });
    const notReadIds = notifications.filter(n => !n.read).map(n => n._id);
    // this.markReadNotification(notReadIds);
    return notifications;
  }

  async markReadNotification(ids: string[]): Promise<void> {
    const notifications = await this.checkExistedIds(ids);
    for (const notification of notifications) {
      await this.save({
        ...notification,
        read: true
      });
    }
  }

  async createNotificationQa(qa: QaEntity): Promise<NotificationEntity> {
    const post = await this.postService.checkExistedId(qa.postID);
    const user = await this.userService.checkExistedId(qa.createdBy);
    return this.save({
      userID: post.createdBy,
      message: `${user.name} đã tạo câu hỏi dưới bài viết "${post.name}"`,
      postID: post._id,
      read: false
    });
  }

  async createNotificationComment(comment: CommentEntity): Promise<NotificationEntity> {
    const qa = await this.qaService.checkExistedId(comment.qaID);
    const post = await this.postService.checkExistedId(qa.postID);
    const user = await this.userService.checkExistedId(comment.createdBy);
    return this.save({
      userID: qa.createdBy,
      message: `${user.name} vừa bình luận dưới câu hỏi của bạn`,
      qaID: qa._id,
      postID: post._id,
      read: false
    });
  }


  async createNotificationPost(post: PostEntity): Promise<NotificationEntity>{
    const stateInfo = post.state === 'PUBLISHED' ? 'được công khai' : 'bị từ chối'
    return this.save({
      userID: post.createdBy,
      message: `Bài viết "${post.name}" đã ${stateInfo}`,
      isPostVerify: true,
      postID: post._id,
      read: false
    })
  }

}
