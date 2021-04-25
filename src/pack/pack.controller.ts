import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/user/user.decorator';
import UserEntity, { UserRole } from 'src/user/user.entity';
import { PackDTO, UpdatePackDTO } from './pack.dto';
import PackEntity from './pack.entity';
import { PackService } from './pack.service';

@Controller('api/pack')
@ApiTags('Pack')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class PackController{
    constructor(private readonly packService: PackService){}

    @Get('public')
    @ApiResponse({type: [PackEntity]})
    getPublicPack(): Promise<PackEntity[]>{
        return this.packService.getPublic()
    }

    @Get()
    @ApiResponse({type: [PackEntity]})
    @Roles(UserRole.ADMIN)
    getAll(): Promise<PackEntity[]>{
        return this.packService.find()
    }


    @Post()
    @Roles(UserRole.ADMIN)
    @ApiResponse({type: PackEntity, status: HttpStatus.OK})
    createPack(@Body() body: PackDTO, @User() user: UserEntity): Promise<PackEntity>{
        return this.packService.createPack(body, user._id);
    }

    @Put('/hide')
    @Roles(UserRole.ADMIN)
    @ApiResponse({type: Boolean, status: HttpStatus.OK})
    hidePack(@Body() ids: string[], @User() user: UserEntity): Promise<Boolean>{
        return this.packService.changeState(ids, false, user._id);
    }

    @Put('/publish')
    @Roles(UserRole.ADMIN)
    @ApiResponse({type: Boolean, status: HttpStatus.OK})
    publishPack(@Body() ids: string[], @User() user: UserEntity): Promise<Boolean>{
        return this.packService.changeState(ids, true, user._id);
    }

    @Put()
    @Roles(UserRole.ADMIN)
    @ApiResponse({type: PackEntity, status: HttpStatus.OK})
    updatePack(@Body() body: UpdatePackDTO, @User() user: UserEntity): Promise<PackEntity>{
        return this.packService.updatePack(body, user._id);
    }

    @Delete()
    @Roles(UserRole.ADMIN)
    @ApiResponse({type: Boolean, status: HttpStatus.OK})
    deletePack(@Body() ids: string[]): Promise<Boolean>{
        return this.packService.deletePack(ids);
    }

    @Post('register/:packId/:postId')
    @ApiResponse({type: Boolean, description: 'User can register highlight pack for post'})
    registerPack(@Param('packId') packId: string, @Param('postId') postId: string, @User() user: UserEntity): Promise<boolean>{
        return this.packService.register(packId, postId, user)
    }
}
