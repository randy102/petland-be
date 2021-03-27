import { Controller, Get, HttpStatus, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import UserEntity, { UserRole } from './user.entity';
import { Roles, RolesGuard } from '../auth/roles.guard';

@Controller('api/user')
@ApiTags('User')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  @ApiResponse({type: UserEntity, status: HttpStatus.OK})
  @Roles(UserRole.USER)
  getProfile(@Request() req): UserEntity {
    return req.user;
  }
}
