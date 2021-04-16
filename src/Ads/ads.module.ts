import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdsController } from './ads.controller';
import AdsEntity from './ads.entity';
import { AdsService } from './ads.service';

@Module({
  controllers: [AdsController],
  providers: [AdsService],
  imports: [
    TypeOrmModule.forFeature([AdsEntity]),
  ],
  exports: [AdsService]
})
export class AdsModule {}
