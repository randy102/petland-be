import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import BaseService from '../base/base.service';
import PostEntity, { PostStatus } from './post.entity';
import { CreatePostDTO, PostResponseDTO, RejectPostDTO, UpdatePostDTO } from './post.dto';
import { CategoryService } from '../category/category.service';
import { join, match, set, unwind } from '../utils/mongo/aggregate-tools';
import { NoPermissionError } from '../commons/auth.exception';
import { CityService } from '../city/city.service';
import { DistrictService } from '../district/district.service';

@Injectable()
export class PostService extends BaseService<PostEntity> {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly cityService: CityService,
    private readonly districtService: DistrictService,
  ) {
    super(PostEntity, 'Bài đăng');
  }

  static baseAggregate(): object[] {
    return [
      join('Category', 'categoryID', '_id', 'category'),
      unwind('$category'),
      set({ category: '$category.name' }),

      join('User', 'createdBy', '_id', 'createdName'),
      unwind('$createdName'),
      set({ createdName: '$createdName.name' }),

      join('District', 'districtID', '_id', 'district'),
      unwind('$district'),
      set({ district: '$district.name' }),

      join('City', 'cityID', '_id', 'city'),
      unwind('$city'),
      set({ city: '$city.name' }),
    ];
  }

  async getAll(): Promise<PostResponseDTO[]> {
    return this.aggregate([...PostService.baseAggregate()]);
  }

  async create(data: CreatePostDTO, createdBy: string): Promise<PostEntity> {
    await this.foreignCheck(data);

    return this.save({
      ...data,
      state: PostStatus.DRAFT,
      createdBy,
    });
  }

  async foreignCheck(data: CreatePostDTO): Promise<void> {
    await this.categoryService.checkExistedId(data.categoryID);
    // TODO: Check subcategory
    await this.cityService.checkExistedId(data.cityID);
    await this.districtService.checkExistedId(data.districtID);
  }

  async update(data: UpdatePostDTO, updatedBy: string): Promise<PostEntity> {
    const existed = await this.checkExistedId(data.id);
    await this.foreignCheck(data);
    return this.save({
      ...existed,
      ...data,
      state: PostStatus.DRAFT,
      updatedBy,
    });
  }

  async getByUser(id: string): Promise<PostResponseDTO[]> {
    return this.aggregate([
      match({ createdBy: id }),
      ...PostService.baseAggregate(),
    ]);
  }

  async confirmPost(id: string, updatedBy: string): Promise<PostEntity> {
    const existed = await this.checkExistedId(id);
    await this.checkPostOwner(existed, updatedBy)
    if(existed.state != PostStatus.DRAFT) {
      throw new HttpException("Only confirm post in draft state!", HttpStatus.BAD_REQUEST)
    }
    return this.save({
      ...existed,
      state: PostStatus.PENDING,
      updatedBy,
    });
  }

  async hidePost(id: string, updatedBy: string): Promise<PostEntity> {
    const existed = await this.checkExistedId(id);
    await this.checkPostOwner(existed, updatedBy)
    if(existed.state != PostStatus.PUBLISHED) {
      throw new HttpException("Only hide post in published state!", HttpStatus.BAD_REQUEST)
    }
    return this.save({
      ...existed,
      state: PostStatus.HIDDEN,
      updatedBy,
    });
  }

  async publishPost(id: string, updatedBy: string): Promise<PostEntity> {
    const existed = await this.checkExistedId(id);
    await this.checkPostOwner(existed, updatedBy)
    if(existed.state != PostStatus.HIDDEN) {
      throw new HttpException("Only publish post in hidden state!", HttpStatus.BAD_REQUEST)
    }
    return this.save({
      ...existed,
      state: PostStatus.PUBLISHED,
      updatedBy,
    });
  }

  async checkPostOwner(post: PostEntity, uid: string): Promise<void>{
    const isPostOwner = post.createdBy === uid;
    if (!isPostOwner) throw new NoPermissionError();
  }

  async cancelPost(id: string, updatedBy: string): Promise<PostEntity> {
    const existed = await this.checkExistedId(id);
    await this.checkPostOwner(existed, updatedBy)
    if(existed.state != PostStatus.PENDING) {
      throw new HttpException("Only cancel post in pending state!", HttpStatus.BAD_REQUEST)
    }
    return this.save({
      ...existed,
      state: PostStatus.DRAFT,
      updatedBy,
    });
  }

  async verifyPost(id: string, updatedBy: string): Promise<PostEntity> {
    const existed = await this.checkExistedId(id);

    if(existed.state != PostStatus.PENDING) {
      throw new HttpException("Only verify post in pending state!", HttpStatus.BAD_REQUEST)
    }
    return this.save({
      ...existed,
      state: PostStatus.PUBLISHED,
      updatedBy,
    });
  }

  async rejectPost(id: string, body: RejectPostDTO, updatedBy: string): Promise<PostEntity> {
    const existed = await this.checkExistedId(id);

    if(existed.state != PostStatus.PENDING) {
      throw new HttpException("Only reject post in pending state!", HttpStatus.BAD_REQUEST)
    }

    return this.save({
      ...existed,
      state: PostStatus.REJECTED,
      rejectedReason: body.reason,
      updatedBy,
    });
  }
}
