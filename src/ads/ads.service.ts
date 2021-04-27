import { Injectable } from '@nestjs/common';
import BaseService from 'src/base/base.service';
import { AdsDTO, DeleteAdsDTO, UpdateAdsDTO } from './ads.dto';
import AdsEntity from './ads.entity';
import { File } from './ads.type';
import { PhotoService } from 'src/photo/photo.service';

@Injectable()
export class AdsService extends BaseService<AdsEntity>{
    constructor(
        private readonly photoService: PhotoService,
    ){
          super(AdsEntity, 'Quảng cáo');
      }

    async createAds(data: AdsDTO, file: File, createdBy: string): Promise<AdsEntity>{
        let id: string = null;

        if(file){
            [id] = await this.photoService.create([file]);
        }
        return this.save({
            ...data,
            fileID: id,
            createdBy
        })
    }

    async getAds(data: string): Promise<AdsEntity[]>{
        return await this.find({position: data});
    }

    async updateAds(data: UpdateAdsDTO, file: File, updatedBy: string): Promise<AdsEntity>{
        const ads = await this.checkExistedId(data.id);
        let id: string = null;

        if(data.fileID){
            await this.checkExisted({fileID: data.fileID});
            if(file){
                await this.photoService.remove(data.fileID);
                [id] = await this.photoService.create([file]);
            } 
            else{
                id = data.fileID;
            }
        }
        else{
            if(file){
                [id] = await this.photoService.create([file]);
            }
        }
       
        return await this.save({
            ...ads,
            partner: data.partner,
            url: data.url,
            position: data.position,
            fileID: id,
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
