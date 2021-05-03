import { forwardRef, Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { CategoryModule } from '../category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import PostEntity from './post.entity';
import { CityModule } from '../city/city.module';
import { DistrictModule } from '../district/district.module';
import { SubCategoryModule } from '../sub-category/sub-category.module';
import { NotificationModule } from '../notification/notification.module';

@Module({
  controllers: [PostController],
  providers: [PostService],
  imports: [
    TypeOrmModule.forFeature([PostEntity]),
    forwardRef(() =>CategoryModule),
    CityModule,
    DistrictModule,
    NotificationModule,
    forwardRef(() => SubCategoryModule),
  ],
  exports: [PostService]
})
export class PostModule {}
