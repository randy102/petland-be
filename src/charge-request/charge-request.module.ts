import { Module } from '@nestjs/common';
import { ChargeRequestService } from './charge-request.service';
import { ChargeRequestController } from './charge-request.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import ChargeRequestEntity from './charge-request.entity';
import { PointTransactionModule } from '../point-transaction/point-transaction.module';


@Module({
  imports: [
    TypeOrmModule.forFeature([ChargeRequestEntity]),
    PointTransactionModule
  ],
  providers: [ChargeRequestService],
  controllers: [ChargeRequestController]
})
export class ChargeRequestModule {}
