import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
  ],
  exports: [CommentService]
})

export class CommentModule {}

