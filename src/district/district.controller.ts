import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import DistrictEntity from './district.entity';
import { DistrictService } from './district.service';

@Controller('api/district')
@ApiTags('District')
export class DistrictController{
    constructor( private readonly districtService: DistrictService) {}

    @Get()
    @ApiResponse({type: DistrictEntity, status: HttpStatus.OK})
    getDistrict(@Query('city') cityID: string): Promise<DistrictEntity[]>{
        return this.districtService.getDistrict(cityID);
    }

    
}
