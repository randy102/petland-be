import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiResponse } from '@nestjs/swagger';
import ChargeRequestEntity from './charge-request.entity';
import { ChargeRequestResponseDTO, ConfirmChargeRequestDTO, CreateChargeRequestDTO, RejectChargeRequestDTO } from './charge-request.dto';
import { ChargeRequestService } from './charge-request.service';
import { User } from '../user/user.decorator';
import UserEntity, { UserRole } from '../user/user.entity';
import { Roles, RolesGuard } from '../auth/roles.guard';

@Controller('charge-request')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ChargeRequestController {
  constructor(private readonly chargeRequestService: ChargeRequestService) {}

  @Get()
  @Roles(UserRole.ADMIN)
  @ApiResponse({type: [ChargeRequestResponseDTO], description: 'Admin can see all charge request'})
  getAllChargeRequests(): Promise<ChargeRequestResponseDTO[]>{
    return this.chargeRequestService.getAll();
  }

  @Get('user')
  @ApiResponse({type: [ChargeRequestResponseDTO], description: 'User can see his charge requests'})
  getUserChargeRequests(@User() user: UserEntity): Promise<ChargeRequestResponseDTO[]>{
    return this.chargeRequestService.getUserRequests(user._id);
  }

  @Post()
  @ApiResponse({type: ChargeRequestEntity, description: 'User can send charge request'})
  sendChargeRequest(@Body() body: CreateChargeRequestDTO, @User() user: UserEntity): Promise<ChargeRequestEntity>{
    return this.chargeRequestService.create(body, user._id);
  }

  @Post('confirm')
  @Roles(UserRole.ADMIN)
  @ApiResponse({type: [ChargeRequestEntity], description: 'Admin can confirm charge request'})
  confirmChargeRequest(@Body() body: ConfirmChargeRequestDTO, @User() user: UserEntity): Promise<ChargeRequestEntity[]>{
    return this.chargeRequestService.confirm(body, user._id)
  }

  @Post('reject')
  @Roles(UserRole.ADMIN)
  @ApiResponse({type: ChargeRequestEntity, description: 'Admin can reject charge request and give reject reason'})
  rejectChargeRequest(@Body() body: RejectChargeRequestDTO, @User() user: UserEntity): Promise<ChargeRequestEntity>{
    return this.chargeRequestService.reject(body, user._id)
  }

}
