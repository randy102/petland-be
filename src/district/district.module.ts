import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DistrictController } from './district.controller';
import DistrictEntity from './district.entity';
import { DistrictService } from './district.service';

@Module({
  controllers: [DistrictController],
  providers: [DistrictService],
  imports: [
    TypeOrmModule.forFeature([DistrictEntity]),
  ],
  exports: [DistrictService]
})
export class DistrictModule {}
