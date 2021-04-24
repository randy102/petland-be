import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from 'src/notification/notification.module';
import { QaModule } from 'src/qa/qa.module';
import { CommentController } from './comment.controller';
import CommentEntity from './comment.entity';
import { CommentService } from './comment.service';

@Module({
  controllers: [CommentController],
  providers: [CommentService],
  imports: [
    TypeOrmModule.forFeature([CommentEntity]),
    forwardRef(() => QaModule),
    forwardRef(() => NotificationModule),
  ],
  exports: [CommentService]
})

export class CommentModule {}

