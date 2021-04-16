import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from 'src/category/category.module';
import { PostModule } from 'src/post/post.module';
import { SubCategoryController } from './sub-category.controller';
import SubCategoryEntity from './sub-category.entity';
import { SubCategoryService } from './sub-category.service';

@Module({
    controllers: [SubCategoryController],
    providers: [SubCategoryService],
    imports: [
        TypeOrmModule.forFeature([SubCategoryEntity]),
        forwardRef(() => CategoryModule),
        forwardRef(() => PostModule),
    ],
    exports: [SubCategoryService]
})
export class SubCategoryModule {}
