import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { equals } from 'class-validator';
import { throwError } from 'rxjs';
import BaseService from 'src/base/base.service';
import { DuplicateError, NotFoundError } from 'src/commons/data.exception';
import { CategoryDto, UpdateCategoryDto } from './category.dto';
import CategoryEntity from './category.entity';

@Injectable()
export class CategoryService extends BaseService<CategoryEntity>{
  constructor(){
      super(CategoryEntity, 'Loại thú cưng');
  }

  async createCategory(data: CategoryDto): Promise<CategoryEntity>{
      const { name } = data;
      await this.checkDuplication({name});
      const createCategory = this.save({
          ...data
      });
      return createCategory ;
  }

  async getCategories(): Promise<CategoryEntity[]>{
      return this.find();
  }

  async updateCategory(data: UpdateCategoryDto): Promise<CategoryEntity>{
      const category = await this.checkExisted({_id: data.id});
      await this.checkDuplication({name: data.newName});
      const updateCategory = this.save({
          ...category,
          name: data.newName,
          _id: data.id
      })
      return updateCategory;
  }

  async deleteCategory(id: string): Promise<Boolean>{
      const category = await this.checkExisted({_id: id});
      return this.delete([id]);
  }
}
