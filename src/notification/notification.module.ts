import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentModule } from 'src/comment/comment.module';
import { PostModule } from 'src/post/post.module';
import { QaModule } from 'src/qa/qa.module';
import { UserModule } from 'src/user/user.module';
import { NotificationController } from './notification.controller';
import NotificationEntity from './notification.entity';
import { NotificationService } from './notification.service';

@Module({
  controllers: [NotificationController],
  providers: [NotificationService],
  imports: [
    TypeOrmModule.forFeature([NotificationEntity]),
    UserModule,
    PostModule,
    forwardRef(() =>  QaModule),
    forwardRef(() => CommentModule),
  ],
  exports: [NotificationService],
})
export class NotificationModule {}
