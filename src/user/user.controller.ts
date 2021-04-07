import { Body, Controller, Get, HttpStatus, Param, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import UserEntity, { UserRole } from './user.entity';
import { Roles, RolesGuard } from '../auth/roles.guard';
import { User } from './user.decorator';
import { ChangePasswordDTO, ChangeUserRoleDTO, LockUserDTO, UpdateProfileDTO, UserResponseDTO } from './user.dto';

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

  @Get('list')
  @Roles(UserRole.ADMIN)
  @ApiResponse({type: [UserResponseDTO], status: HttpStatus.OK})
  async getUsers(): Promise<UserResponseDTO[]>{
    console.log(await this.userService.getUsers());
    return this.userService.getUsers();
  }

  @Get('detail/:id')
  @Roles(UserRole.ADMIN)
  @ApiResponse({type: UserResponseDTO, status: HttpStatus.OK})
  getDetail(@Param('id') id: string): Promise<UserResponseDTO>{
    return this.userService.getDetail(id);
  }

  @Put('changePassWord')
  @ApiResponse({type: UserEntity, status: HttpStatus.OK})
  changePassWord(@Body() body: ChangePasswordDTO, @User() user: UserEntity): Promise<UserEntity>{
    return this.userService.changePassWord(body,user._id);
  }

  @Put('changeInfo')
  @ApiResponse({type: UserEntity, status: HttpStatus.OK})
  changeInfo(@Body() body: UpdateProfileDTO, @User() user: UserEntity): Promise<UserEntity>{
    return this.userService.changeInfo(body, user._id);
  }

  @Put('lockUser')
  @Roles(UserRole.ADMIN)
  @ApiResponse({type: UserEntity, status: HttpStatus.OK})
  lockUser(@Body() body: LockUserDTO, @User() user: UserEntity): Promise<UserEntity>{
    return this.userService.lockUser(body, user._id);
  }

  @Put('role')
  @Roles(UserRole.ADMIN)
  @ApiResponse({type: UserEntity, status: HttpStatus.OK})
  changeRole(@Body() body: ChangeUserRoleDTO, @User() user: UserEntity): Promise<UserEntity>{
    return this.userService.changeRole(body, user._id);
  }
}
