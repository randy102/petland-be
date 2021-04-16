import { Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/user/user.decorator';
import UserEntity, { UserRole } from 'src/user/user.entity';
import { AdsDto } from './ads.dto';
import AdsEntity from './ads.entity';
import { AdsService } from './ads.service';
import { File } from '../photo/photo.type';

@Controller('api/ads')
@ApiTags('Ads')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdsController {
    constructor(private readonly adsService: AdsService){}
    
    @Post()
    @Roles(UserRole.ADMIN)
    @UseInterceptors(FileInterceptor('file'))
    createAds(@Body() body: AdsDto, @UploadedFile() file: File, @User() user: UserEntity): Promise<AdsEntity>{
        return this.adsService.createAds(body, user._id);
    }
}
