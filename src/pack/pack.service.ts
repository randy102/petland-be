import { Injectable } from '@nestjs/common';
import BaseService from 'src/base/base.service';
import { PackDTO, UpdatePackDTO } from './pack.dto';
import PackEntity from './pack.entity';

@Injectable()
export class PackService extends BaseService<PackEntity>{
    constructor(){
        super(PackEntity,'Gói nổi bật')
    }

    async createPack(data: PackDTO, createdBy: string): Promise<PackEntity>{
        await this.checkDuplication({name: data.name});
        return this.save({
            ...data,
            state: true,
            createdBy
        })
    }

    async changeState(ids: string[], state: boolean, updatedBy: string): Promise<Boolean>{
        const packs = await this.checkExistedIds(ids);
        for(let pack of packs){
            await this.save({
                ...pack,
                state: state,
                updatedBy
            })
        }
        return true;
    }   

    async updatePack(data: UpdatePackDTO, updatedBy: string): Promise<PackEntity>{
        const pack = await this.checkExistedId(data.id);
        await this.checkDuplication({name: data.name});
        return this.save({
            ...pack,
            name: data.name,
            dayNumber: data.dayNumber,
            price: data.price,
            updatedBy
        })
    }
    
    async deletePack(ids: string[]): Promise<Boolean>{
        await this.checkExistedIds(ids);
        return this.delete(ids);
    }
}
