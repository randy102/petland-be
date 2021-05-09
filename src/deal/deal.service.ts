import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import BaseService from '../base/base.service';
import DealEntity from './deal.entity';
import { CreateDealDTO, DealResponseDTO, UpdateDealDTO } from './deal.dto';
import { and, condIf, fieldExists, gte, joinMany2One, match, set } from '../utils/mongo/aggregate-tools';
import { Moment } from '../utils/moment';
import { IdArrayDTO } from '../base/base.dto';
import { PostService } from '../post/post.service';

@Injectable()
export class DealService extends BaseService<DealEntity> {
  constructor(private readonly postService: PostService) {
    super(DealEntity, 'Thỏa thuận giá');
  }

  static baseAggregate(): object[] {
    return [
      ...joinMany2One('User', 'createdBy', '_id', 'createdUser'),
      ...joinMany2One('Post', 'postID', '_id', 'isOver'),
      set({
        'isOver': condIf(
          and(
            fieldExists('isOver.auctionExpired'),
            gte('$isOver.auctionExpiredAt', Moment().valueOf())
          ),
          true, false
        )
      })
    ];
  }

  getByUser(userID: string): Promise<DealResponseDTO[]> {
    return this.aggregate([
      match({ createdBy: userID }),
      ...DealService.baseAggregate()
    ]);
  }

  create(body: CreateDealDTO, createdBy: string): Promise<DealEntity> {
    return this.save({
      ...body,
      createdBy,
      isAccepted: false
    });
  }

  async update(body: UpdateDealDTO, createdBy: string): Promise<DealEntity> {
    const existed = await this.checkExistedId(body._id);
    return this.save({
      ...existed,
      ...body,
      updatedBy: createdBy
    });
  }

  getByPost(postID: string): Promise<DealResponseDTO[]> {
    return this.aggregate([
      match({ postID }),
      ...DealService.baseAggregate()
    ]);
  }

  async deleteDeal(body: IdArrayDTO, userID: string): Promise<boolean> {
    for (const id of body.ids){
      const deal = await this.checkExistedId(id)
      if (deal.createdBy !== userID){
        throw new HttpException('Chỉ được xóa thỏa thuận giá của mình', HttpStatus.BAD_REQUEST)
      }
    }
    return this.delete(body.ids);
  }

  async accept(id: string, userID: string) : Promise<DealEntity>{
    const deal = await this.checkExistedId(id)
    const post = await this.postService.checkExistedId(deal.postID)
    await this.postService.checkPostOwner(post, userID)
    await this.postService.save({
      ...post,
      auctionExpired: Moment().valueOf()
    })
    return  this.save({
      ...deal,
      isAccepted: true
    })
  }
}
