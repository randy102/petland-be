import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import DealEntity from './deal.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DealEntity])],
  providers: [DealService],
  controllers: [DealController]
})
export class DealModule {}
