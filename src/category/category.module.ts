import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubCategoryModule } from 'src/sub-category/sub-category.module';
import { CategoryController } from './category.controller';
import CategoryEntity from './category.entity';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [
    TypeOrmModule.forFeature([CategoryEntity]),
    forwardRef(() => SubCategoryModule),
  ],
  exports: [CategoryService]
})
export class CategoryModule {}
