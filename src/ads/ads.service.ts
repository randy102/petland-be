import { Injectable } from '@nestjs/common';
import BaseService from 'src/base/base.service';
import { AdsDTO, DeleteAdsDTO, UpdateAdsDTO } from './ads.dto';
import AdsEntity from './ads.entity';
import { PhotoService } from 'src/photo/photo.service';

@Injectable()
export class AdsService extends BaseService<AdsEntity>{
    constructor(
        private readonly photoService: PhotoService,
    ){
          super(AdsEntity, 'Quảng cáo');
      }

    async createAds(data: AdsDTO, createdBy: string): Promise<AdsEntity>{
        await this.checkDuplication({fileID: data.fileID});

        return this.save({
            ...data,
            createdBy
        })
    }

    async getAds(data: string): Promise<AdsEntity[]>{
        return await this.find({position: data});
    }

    async updateAds(data: UpdateAdsDTO, updatedBy: string): Promise<AdsEntity>{
        const ads = await this.checkExistedId(data.id);
       
        return await this.save({
            ...ads,
            partner: data.partner,
            url: data.url,
            position: data.position,
            fileID: data.fileID,
            updatedBy
        })
    }

    async deleteAds(data: DeleteAdsDTO): Promise<Boolean>{
        const Adss = await this.checkExistedIds(data.ids);

        for(let Ads of Adss){
            if(Ads.fileID){
                await this.photoService.remove(Ads.fileID);
            }
        }
        return await this.delete(data.ids);
    }
}
