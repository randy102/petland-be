import { Body, Controller, Get, HttpStatus, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { User } from 'src/user/user.decorator';
import UserEntity from 'src/user/user.entity';
import NotificationEntity from './notification.entity';
import { NotificationService } from './notification.service';
import { ReadNotificationDTO } from './notification.dto';

@Controller('api/notification')
@ApiTags('Notification')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {
  }

  @Get()
  @ApiResponse({ type: [NotificationEntity], status: HttpStatus.OK })
  listNotification(@User() user: UserEntity): Promise<NotificationEntity[]> {
    return this.notificationService.listNotification(user._id);
  }

  @Put('read')
  @ApiResponse({ type: String, status: HttpStatus.OK })
  async markReadNotification(@Body() body: ReadNotificationDTO): Promise<string> {
    await this.notificationService.markReadNotification(body.ids);
    return 'ok';
  }
}
