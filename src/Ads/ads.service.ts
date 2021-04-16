import { Injectable } from '@nestjs/common';
import BaseService from 'src/base/base.service';
import { AdsDto } from './ads.dto';
import AdsEntity from './ads.entity';

@Injectable()
export class AdsService extends BaseService<AdsEntity>{
    constructor(){
          super(AdsEntity, 'Quảng cáo');
      }

    async createAds(data: AdsDto, createdBy: string): Promise<AdsEntity>{
        
        return
    }
}
