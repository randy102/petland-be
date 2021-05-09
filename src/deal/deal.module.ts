import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import DealEntity from './deal.entity';
import { PostModule } from '../post/post.module';

@Module({
  imports: [TypeOrmModule.forFeature([DealEntity]), PostModule],
  providers: [DealService],
  controllers: [DealController]
})
export class DealModule {}
