import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Public } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { DealService } from './deal.service';
import { CreateDealDTO, DealResponseDTO, UpdateDealDTO } from './deal.dto';
import { User } from '../user/user.decorator';
import UserEntity from '../user/user.entity';
import DealEntity from './deal.entity';
import { IdArrayDTO } from '../base/base.dto';

@Controller('api/deal')
@ApiTags('Deals')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class DealController {
  constructor(private readonly dealService: DealService) {
  }

  @Get('user')
  @ApiResponse({type: [DealResponseDTO]})
  getUserDeals(@User() user: UserEntity): Promise<DealResponseDTO[]>{
    return this.dealService.getByUser(user._id)
  }

  @Get('post/:postID')
  @Public()
  @ApiResponse({type: [DealResponseDTO]})
  getPostDeals(@Param('postID') postID: string){
    return this.dealService.getByPost(postID)
  }

  @Post()
  @ApiResponse({type: DealEntity})
  createDeal(@Body() body: CreateDealDTO, @User() user: UserEntity): Promise<DealEntity>{
    return this.dealService.create(body, user._id)
  }

  @Put()
  @ApiResponse({type: DealEntity})
  updateDeal(@Body() body: UpdateDealDTO, @User() user: UserEntity): Promise<DealEntity>{
    return this.dealService.update(body, user._id)
  }

  @Delete()
  @ApiResponse({type: Boolean})
  deleteDeal(@Body() body: IdArrayDTO, @User() user: UserEntity): Promise<boolean>{
    return this.dealService.deleteDeal(body, user._id)
  }
}
