import { Injectable } from '@nestjs/common';
import BaseService from 'src/base/base.service';
import { SubCategoryDto, SubCategoryResponseDTO } from './sub-category.dto';
import SubCategoryEntity from './sub-category.entity';

@Injectable()
export class SubCategoryService extends BaseService<SubCategoryEntity>{
    constructor(){
        super(SubCategoryEntity,"Giống");
    }

    async createSubCategory(data: SubCategoryDto, createdBy: string): Promise<SubCategoryEntity>{
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
                { $match: { _id: id } },
                {
                    $lookup:{
                        'from': 'Category',
                        'localField': 'categoryID',
                        'foreignField': '_id',
                        'as': 'category'
                    }
                },
                { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
                { $set: { category: '$category.name'}}
            ])
        }
        return await this.aggregate([
            {
                $lookup:{
                    'from': 'Category',
                    'localField': 'categoryID',
                    'foreignField': '_id',
                    'as': 'category'
                }
            },
            { $unwind: { path: '$category', preserveNullAndEmptyArrays: true } },
            { $set: { category: '$category.name'}}
        ])
    }
}
