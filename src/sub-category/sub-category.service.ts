import {forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import BaseService from 'src/base/base.service';
import { CategoryService } from 'src/category/category.service';
import { PostService } from 'src/post/post.service';
import { joinMany2One, match } from 'src/utils/mongo/aggregate-tools';
import { DeleteSubCategoryDto, SubCategoryDTO, SubCategoryResponseDTO, UpdateSubCategoryDTO } from './sub-category.dto';
import SubCategoryEntity from './sub-category.entity';

@Injectable()
export class SubCategoryService extends BaseService<SubCategoryEntity>{
    constructor( 
        @Inject(forwardRef(() => CategoryService))
        private readonly categoryService: CategoryService,
        @Inject(forwardRef(() => PostService))
        private readonly postService: PostService,
    ){
        super(SubCategoryEntity,"Giống");
    }

    async createSubCategory(data: SubCategoryDTO, createdBy: string): Promise<SubCategoryEntity>{
        await this.categoryService.checkExistedId(data.categoryID);
        await this.checkDuplication({name: data.name});
        return this.save({
            ...data,
            createdBy
            });
    }

    async getSubCategory(id: string): Promise<SubCategoryResponseDTO[]>{
        if(id){
            return await this.aggregate([
                match({ categoryID: id }),
                ...joinMany2One('Category', 'categoryID', '_id', 'category','name')
            ])
        }
        return this.aggregate([...joinMany2One('Category', 'categoryID', '_id', 'category','name')]);
    }

    async updateSubCategory(data: UpdateSubCategoryDTO, updatedBy: string): Promise<SubCategoryEntity>{
        await this.categoryService.checkExistedId(data.categoryID);
        const subCategory = await this.checkExistedId(data.id);
        await this.checkDuplication({name: data.newName});

        return this.save({
            ...subCategory,
            name: data.newName,
            categoryID: data.categoryID,
            updatedBy
        })
    }

    async deleteSubCategory(data: DeleteSubCategoryDto): Promise<boolean>{
        const subCategories = await this.checkExistedIds(data.ids);

        for(let subCategory of subCategories){
            if((await this.postService.find({subCategoryID: subCategory._id})).length){
              throw new HttpException("Bài viết của giống " + subCategory.name + " đã được tạo, không thể xóa giống thú cưng này", HttpStatus.BAD_REQUEST)
            }
        }
        return this.delete(data.ids);
    }
}
