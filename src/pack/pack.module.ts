import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackController } from './pack.controller';
import PackEntity from './pack.entity';
import { PackService } from './pack.service';
import { PointTransactionModule } from '../point-transaction/point-transaction.module';
import { PostModule } from '../post/post.module';

@Module({
  controllers: [PackController],
  providers: [PackService],
  imports: [
    TypeOrmModule.forFeature([PackEntity]),
    PointTransactionModule,
    PostModule
  ],
  exports: [PackService],
})
export class PackModule {}
