import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Public } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/user/user.decorator';
import UserEntity, { UserRole } from 'src/user/user.entity';
import { AdsDTO, DeleteAdsDTO, UpdateAdsDTO } from './ads.dto';
import AdsEntity from './ads.entity';
import { AdsService } from './ads.service';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@Controller('api/ads')
@ApiTags('Ads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdsController {

  constructor(private readonly adsService: AdsService){}
  
  @Post()
  @ApiResponse({ type: AdsEntity, status: HttpStatus.OK})
  createAds(@Body() body: AdsDTO, @User() user: UserEntity): Promise<AdsEntity>{
      return this.adsService.createAds(body, user._id);
  }

  @Get()
  @Public()
  @ApiResponse({ type: AdsEntity, status: HttpStatus.OK })
  @ApiImplicitQuery({ name: 'position', required: false })
  getAds(@Query('position') position?: string): Promise<AdsEntity[]> {
    return this.adsService.getAds(position);
  }

  @Put()
  @ApiResponse({ type: AdsEntity, status: HttpStatus.OK })
  updateAds(@Body() body: UpdateAdsDTO, @User() user: UserEntity): Promise<AdsEntity> {
    return this.adsService.updateAds(body, user._id);
  }

  @Delete()
  @ApiResponse({ type: Boolean, status: HttpStatus.OK })
  deleteAds(@Body() body: DeleteAdsDTO): Promise<Boolean> {
    return this.adsService.deleteAds(body);
  }
}
