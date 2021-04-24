import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import BaseService from '../base/base.service';
import PointTransactionEntity from './point-transaction.entity';
import { CreateTransactionDTO } from './point-transaction.dto';
import { UserService } from '../user/user.service';
import { create } from 'domain';

@Injectable()
export class PointTransactionService extends BaseService<PointTransactionEntity>{
  constructor(
    private readonly userService: UserService
  ) {
    super(PointTransactionEntity, 'Giao dịch điểm');
  }

  getUser(userID: string): Promise<PointTransactionEntity[]> {
    return Promise.resolve([]);
  }

  charge(userID: string, amount: number, requestCode: string): Promise<PointTransactionEntity>{
    if (amount <= 0){
      throw new HttpException("Điểm cần nạp phải lớn hơn 0", HttpStatus.BAD_REQUEST)
    }
    return this.create({userID, amount, description: `Yêu cầu nạp điểm #${requestCode}`})
  }

  exchange(userID: string, amount: number, postName: string): Promise<PointTransactionEntity> {
    if (amount > 0){
      throw new HttpException("Điểm quy đổi phải nhỏ hơn 0", HttpStatus.BAD_REQUEST)
    }
    return this.create({userID, amount, description: `Quy đổi điểm nổi bật cho bài viết ${postName}`})
  }

  async create(data: CreateTransactionDTO): Promise<PointTransactionEntity>{
    const user = await this.userService.checkExistedId(data.userID)
    const currentBalance = user.points || 0
    const newBalance = currentBalance + data.amount
    if (newBalance < 0){
      throw new HttpException("Bạn không đủ điểm để giao dịch", HttpStatus.BAD_REQUEST)
    }
    await this.userService.save({
      ...user,
      points: newBalance
    })
    return this.save({
      ...data,
    })
  }
}
