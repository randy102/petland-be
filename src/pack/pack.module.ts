import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PackController } from './pack.controller';
import PackEntity from './pack.entity';
import { PackService } from './pack.service';

@Module({
  controllers: [PackController],
  providers: [PackService],
  imports: [
    TypeOrmModule.forFeature([PackEntity]),
  ],
  exports: [PackService],
})
export class PackModule {}
