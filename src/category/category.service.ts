import {forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import BaseService from 'src/base/base.service';
import { SubCategoryService } from 'src/sub-category/sub-category.service';
import { CategoryDto, DeleteCategoryDto, UpdateCategoryDto } from './category.dto';
import CategoryEntity from './category.entity';

@Injectable()
export class CategoryService extends BaseService<CategoryEntity>{
  constructor(
    @Inject(forwardRef(() => SubCategoryService))
    private readonly subCategoryService: SubCategoryService,
  ){
      super(CategoryEntity, 'Loại thú cưng');
  }

  async createCategory(data: CategoryDto, createdBy: string): Promise<CategoryEntity>{
      const { name } = data;
      await this.checkDuplication({name});
      return this.save({
          ...data,
          createdBy
      });
  }

  async getCategories(): Promise<CategoryEntity[]>{
      return this.find();
  }

  async updateCategory(data: UpdateCategoryDto, updatedBy: string): Promise<CategoryEntity>{
      const category = await this.checkExisted({_id: data.id});
      await this.checkDuplication({name: data.newName});
      const updateCategory = this.save({
          ...category,
          name: data.newName,
         updatedBy
      })
      return updateCategory;
  }

  async deleteCategory(data: DeleteCategoryDto): Promise<Boolean>{
        const categories = await this.checkExistedIds(data.ids);

        for(let category of categories){
            if((await this.subCategoryService.find({categoryID: category._id})).length){
                throw new HttpException("Giống của " + category.name + " đã được tạo, không thể xóa loại thú cưng này", HttpStatus.BAD_REQUEST)
            }
        }
        return this.delete(data.ids);
  }
}
