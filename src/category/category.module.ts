import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfigService from 'src/config/TypeOrm';
import { CategoryController } from './category.controller';
import CategoryEntity from './category.entity';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService],
  imports: [
    TypeOrmModule.forFeature([CategoryEntity]),
  ],
  exports: [CategoryService]
})
export class CategoryModule {}
