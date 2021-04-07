import { Injectable } from '@nestjs/common';
import BaseService from '../base/base.service';
import PostEntity, { PostStatus } from './post.entity';
import { CreatePostDTO, PostResponseDTO, UpdatePostDTO } from './post.dto';
import { CategoryService } from '../category/category.service';
import { join, set, unwind } from '../utils/mongo/aggregate-tools';

@Injectable()
export class PostService extends BaseService<PostEntity>{
  constructor(private readonly categoryService: CategoryService) {
    super(PostEntity, 'Bài đăng');
  }

  async getAll(): Promise<PostResponseDTO[]>{
    return this.aggregate([
      join('Category','categoryID','_id','category'),
      unwind('$category'),
      set({category: '$category.name'}),

      join('User','createdBy','_id','createdName'),
      unwind('$createdName'),
      set({createdName: '$createdName.name'}),

      join('District','districtID','_id','district'),
      unwind('$district'),
      set({district: '$district.name'}),

      join('City','cityID','_id','city'),
      unwind('$city'),
      set({city: '$city.name'})
    ])
  }

  async create(data: CreatePostDTO, createdBy: string): Promise<PostEntity>{
    await this.categoryService.checkExistedId(data.categoryID);
    //TODO: Check subcategory
    return this.save({
      ...data,
      state: PostStatus.DRAFT,
      createdBy
    })
  }

  async update(data: UpdatePostDTO, updatedBy: string): Promise<PostEntity>{
    const existed = await this.checkExistedId(data.id)
    await this.categoryService.checkExistedId(data.categoryID)
    //TODO: Check subcategory
    return this.save({
      ...existed,
      ...data,
      state: PostStatus.DRAFT,
      updatedBy
    })
  }
}
