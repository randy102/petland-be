import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import PointTransactionEntity from './point-transaction.entity';
import { User } from '../user/user.decorator';
import UserEntity from '../user/user.entity';
import { PointTransactionService } from './point-transaction.service';

@ApiTags("Point Transaction")
@Controller('api/point-transaction')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PointTransactionController {
  constructor(private readonly pointTransactionService: PointTransactionService) {}

  @Get('user')
  @ApiResponse({type: [PointTransactionEntity], description: 'User can see his point transaction history'})
  getUserTransaction(@User() user: UserEntity): Promise<PointTransactionEntity[]>{
    return this.pointTransactionService.getUser(user._id);
  }

  @Get()
  @ApiResponse({type: [PointTransactionEntity], description: 'Admin can see all point transaction history'})
  getAllTransaction(@User() user: UserEntity): Promise<PointTransactionEntity[]>{
    return this.pointTransactionService.find();
  }
}
