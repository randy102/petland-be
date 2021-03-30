import { Body, Controller, Get, HttpStatus, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import UserEntity, { UserRole } from './user.entity';
import { Roles, RolesGuard } from '../auth/roles.guard';
import { User } from './user.decorator';
import { ChangeUserRoleDTO } from './user.dto';

@Controller('api/user')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiResponse({type: UserEntity, status: HttpStatus.OK})
  getProfile(@User() user): UserEntity {
    return user;
  }

  @Put('role')
  @Roles(UserRole.ADMIN)
  @ApiResponse({type: UserEntity, status: HttpStatus.OK})
  changeRole(@Body() body: ChangeUserRoleDTO, @User() user: UserEntity): Promise<UserEntity>{
    return this.userService.changeRole(body, user._id);
  }
}
