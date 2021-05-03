import { Body, Controller, Get, HttpStatus, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Public } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/user/user.decorator';
import UserEntity, { UserRole } from 'src/user/user.entity';
import NotificationEntity from './notification.entity';
import { NotificationService } from './notification.service';

@Controller('notification')
@ApiTags('Notification')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class NotificationController {
    constructor(private readonly notificationService: NotificationService){}

    @Get()
    @ApiResponse({type: [NotificationEntity], status: HttpStatus.OK})
    listNotification(@User() user: UserEntity): Promise<NotificationEntity[]>{
        return this.notificationService.listNotification(user._id);
    }
}
