import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from './city.controller';
import CityEntity from './city.entity';
import { CityService } from './city.service';

@Module({
  controllers: [CityController],
  providers: [CityService],
  imports: [
    TypeOrmModule.forFeature([CityEntity]),
  ],
  exports: [CityService]
})
export class CityModule {}
