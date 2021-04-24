import { Injectable } from '@nestjs/common';
import { ChargeRequestResponseDTO, ConfirmChargeRequestDTO, CreateChargeRequestDTO, RejectChargeRequestDTO } from './charge-request.dto';
import BaseService from '../base/base.service';
import ChargeRequestEntity, { ChargeRequestState } from './charge-request.entity';
import { joinMany2One, match } from '../utils/mongo/aggregate-tools';
import shortid from 'shortid';
import { PointTransactionService } from '../point-transaction/point-transaction.service';

@Injectable()
export class ChargeRequestService extends BaseService<ChargeRequestEntity>{
  constructor(
    private readonly transactionService: PointTransactionService
  ) {
    super(ChargeRequestEntity,'Yêu cầu nạp điểm');
  }


  create(body: CreateChargeRequestDTO, createdBy: string): Promise<ChargeRequestEntity> {
    return this.save({
      ...body,
      createdBy,
      code: shortid.generate(),
      state: ChargeRequestState.PENDING
    })
  }

  private static baseAggregate(): object[]{
    return [
      ...joinMany2One('User', 'createdBy', '_id', 'createdName', 'name'),
    ]
  }

  getUserRequests(userId: string): Promise<ChargeRequestResponseDTO[]> {
    return this.aggregate([
      match({createdBy: userId}),
      ...ChargeRequestService.baseAggregate()
    ])
  }

  getAll(): Promise<ChargeRequestResponseDTO[]> {
    return this.aggregate([
      ...ChargeRequestService.baseAggregate()
    ])
  }

  async confirm(body: ConfirmChargeRequestDTO, updatedBy: string): Promise<ChargeRequestEntity[]> {
    const existed = await this.checkExistedIds(body.ids)
    const updated = []
    for (const request of existed){
      if (request.state != ChargeRequestState.PENDING) {
        continue
      }
      await this.transactionService.charge(request.createdBy, request.amount, request.code)
      updated.push(await this.save({
        ...request,
        updatedBy,
        state: ChargeRequestState.DONE
      }))
    }
    return updated
  }

  async reject(body: RejectChargeRequestDTO, updatedBy: string):Promise<ChargeRequestEntity> {
    const existed = await this.checkExistedId(body.id)
    return this.save({
      ...existed,
      ...body,
      updatedBy,
      state: ChargeRequestState.FAILED,
    })
  }
}
