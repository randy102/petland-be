import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CategoryModule } from '../category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostEntity from './post.entity';
import { CityModule } from '../city/city.module';
import { DistrictModule } from '../district/district.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    CategoryModule,
    CityModule,
    DistrictModule
  ],
  exports: [PostService]
})
export class PostModule {}
