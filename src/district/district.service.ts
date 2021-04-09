import { Injectable } from '@nestjs/common';
import BaseService from 'src/base/base.service';
import { joinMany2One, match } from 'src/utils/mongo/aggregate-tools';
import DistrictEntity from './district.entity';

@Injectable()
export class DistrictService extends BaseService<DistrictEntity> {
    constructor(){
        super(DistrictEntity,"Quận");
    }

    async getDistrict(id: string): Promise<DistrictEntity[]>{
        if(id){
            return this.aggregate([
                match({ cityID: id }),
                ...joinMany2One('City', 'cityID', '_id', 'city','name')
            ]);
        }
        return this.aggregate([
            ...joinMany2One('City', 'cityID', '_id', 'city','name')
        ]);
    }
}
