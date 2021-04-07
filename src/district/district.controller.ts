import { Controller, Get, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import DistrictEntity from './district.entity';
import { DistrictService } from './district.service';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@Controller('api/district')
@ApiTags('District')
export class DistrictController{
    constructor( private readonly districtService: DistrictService) {}

    @Get()
    @ApiImplicitQuery({name:'city', required:false})
    @ApiResponse({type: DistrictEntity, status: HttpStatus.OK})
    getDistrict(@Query('city') cityID: string): Promise<DistrictEntity[]>{
        return this.districtService.getDistrict(cityID);
    }
    
}
