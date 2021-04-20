import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/user/user.decorator';
import UserEntity, { UserRole } from 'src/user/user.entity';
import { AdsDTO, DeleteAdsDTO, UpdateAdsDTO} from './ads.dto';
import AdsEntity from './ads.entity';
import { AdsService } from './ads.service';
import { File } from './ads.type';

@Controller('api/ads')
@ApiTags('Ads')
@ApiBearerAuth()
@Roles(UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdsController {
    constructor(private readonly adsService: AdsService){}
    
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    @ApiResponse({ type: AdsEntity, status: HttpStatus.OK})
    createAds(@Body() body: AdsDTO, @UploadedFile() file: File, @User() user: UserEntity): Promise<AdsEntity>{
        return this.adsService.createAds(body, file, user._id);
    }

    @Get()
    @ApiResponse({ type: AdsEntity, status: HttpStatus.OK})
    getAds(@Query('position') position: string): Promise<AdsEntity[]>{
        return this.adsService.getAds(position);
    }

    @Put()
    @UseInterceptors(FileInterceptor('file'))
    @ApiResponse({ type: AdsEntity, status: HttpStatus.OK})
    updateAds(@Body() body: UpdateAdsDTO, @UploadedFile() file: File, @User() user: UserEntity): Promise<AdsEntity>{
        return this.adsService.updateAds(body, file, user._id);
    }

    @Delete()
    @ApiResponse({ type: Boolean, status: HttpStatus.OK})
    deleteAds(@Body() body: DeleteAdsDTO): Promise<Boolean>{
        return this.adsService.deleteAds(body);
    }

}
