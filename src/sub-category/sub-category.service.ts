import { Injectable } from '@nestjs/common';
import BaseService from 'src/base/base.service';
import { joinMany2One, match } from 'src/utils/mongo/aggregate-tools';
import { SubCategoryDTO, SubCategoryResponseDTO, UpdateSubCategoryDTO } from './sub-category.dto';
import SubCategoryEntity from './sub-category.entity';

@Injectable()
export class SubCategoryService extends BaseService<SubCategoryEntity>{
    constructor(){
        super(SubCategoryEntity,"Giống");
    }

    async createSubCategory(data: SubCategoryDTO, createdBy: string): Promise<SubCategoryEntity>{
        const { name } = data;
        await this.checkDuplication({name});
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
        const subCategory = await this.checkExisted({_id: data.id});
        await this.checkDuplication({name: data.newName});
        return this.save({
            ...subCategory,
            name: data.newName,
            updatedBy
        })
    }

    async deleteSubCategory(id: string): Promise<boolean>{
        await this.checkExistedId(id);
        return this.delete([id]);
    }
}
