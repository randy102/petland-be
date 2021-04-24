import { Module } from '@nestjs/common';
import { PointTransactionService } from './point-transaction.service';
import { PointTransactionController } from './point-transaction.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import PointTransactionEntity from './point-transaction.entity';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PointTransactionEntity]),
    UserModule
  ],
  providers: [PointTransactionService],
  controllers: [PointTransactionController],
  exports: [PointTransactionService]
})
export class PointTransactionModule {}
