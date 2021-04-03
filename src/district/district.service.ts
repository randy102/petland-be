import { Injectable } from '@nestjs/common';
import BaseService from 'src/base/base.service';
import DistrictEntity from './district.entity';

@Injectable()
export class DistrictService extends BaseService<DistrictEntity> {
    constructor(){
        super(DistrictEntity,"Quận");
    }

    async getDistrict(id: string): Promise<DistrictEntity[]>{
        if(id){
            return this.find({cityID: id});
        }
        return this.find();
    }
}
