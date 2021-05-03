import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { isRFC3339 } from 'class-validator';
import BaseService from 'src/base/base.service';
import { PostService } from 'src/post/post.service';
import { QaService } from 'src/qa/qa.service';
import { UserService } from 'src/user/user.service';
import NotificationEntity from './notification.entity';

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

  async createNotificationQa(postID: string): Promise<NotificationEntity> {
    const post = await this.postService.checkExistedId(postID);
    return this.save({
      userID: post.createdBy,
      message: 'Bài viết của bạn có câu hỏi mới',
      postID: post._id,
      read: false
    });
  }

  async createNotificationComment(qaID: string): Promise<NotificationEntity> {
    const qa = await this.qaService.checkExistedId(qaID);
    const post = await this.postService.checkExistedId(qa.postID);
    return this.save({
      userID: qa.createdBy,
      message: 'Câu hỏi của bạn có bình luận mới',
      qaID: qa._id,
      postID: post._id,
      read: false
    });
  }

}
