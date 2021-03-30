import { Injectable } from '@nestjs/common';
import BaseService from 'src/base/base.service';
import CityEntity from './city.entity';

@Injectable()
export class CityService extends BaseService<CityEntity>{
    constructor(){
        super(CityEntity, "Thành phố");
    }

    async getCity(): Promise<CityEntity[]>{
        return this.find();
    }
}
