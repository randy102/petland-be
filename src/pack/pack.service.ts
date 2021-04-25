import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import BaseService from 'src/base/base.service';
import { PackDTO, UpdatePackDTO } from './pack.dto';
import PackEntity from './pack.entity';
import UserEntity from '../user/user.entity';
import { PointTransactionService } from '../point-transaction/point-transaction.service';
import { PostService } from '../post/post.service';
import { Moment } from '../utils/moment';
import { PostStatus } from '../post/post.entity';

@Injectable()
export class PackService extends BaseService<PackEntity> {
  constructor(
    private readonly transactionService: PointTransactionService,
    private readonly postService: PostService
  ) {
    super(PackEntity, 'Gói nổi bật');
  }

  async createPack(data: PackDTO, createdBy: string): Promise<PackEntity> {
    await this.checkDuplication({ name: data.name });
    return this.save({
      ...data,
      state: true,
      createdBy
    });
  }

  async changeState(ids: string[], state: boolean, updatedBy: string): Promise<Boolean> {
    const packs = await this.checkExistedIds(ids);
    for (let pack of packs) {
      await this.save({
        ...pack,
        state: state,
        updatedBy
      });
    }
    return true;
  }

  async updatePack(data: UpdatePackDTO, updatedBy: string): Promise<PackEntity> {
    const pack = await this.checkExistedId(data.id);
    await this.checkDuplication({ name: data.name });
    return this.save({
      ...pack,
      name: data.name,
      dayNumber: data.dayNumber,
      price: data.price,
      updatedBy
    });
  }

  async deletePack(ids: string[]): Promise<Boolean> {
    await this.checkExistedIds(ids);
    return this.delete(ids);
  }

  async register(packId: string, postId: string, user: UserEntity): Promise<boolean> {
    const pack = await this.checkExistedId(packId);
    const post = await this.postService.checkExistedId(postId)

    await this.postService.checkPostOwner(post, user._id)

    if(post.state != PostStatus.PUBLISHED){
      throw new HttpException('Bài viết phải ở trạng thái công khai!', HttpStatus.BAD_REQUEST)
    }

    if (post.highlightExpired && post.highlightExpired >= Moment().valueOf()){
      throw new HttpException('Bài viết đã được đánh dấu nổi bật!', HttpStatus.BAD_REQUEST)
    }

    await this.transactionService.exchange(user._id, -pack.price, post.name)
    await this.postService.save({...post, highlightExpired: Moment().add(pack.dayNumber,'day').valueOf()})
    return true
  }

  getPublic() : Promise<PackEntity[]>{
    return this.find({state: true})
  }
}
