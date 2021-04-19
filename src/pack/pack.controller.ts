import { Body, Controller, Delete, Get, HttpStatus, Post, Put, Query, UseGuards } from '@nestjs/common';
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
@Roles(UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class PackController{
    constructor(private readonly packService: PackService){}

    @Post()
    @ApiResponse({type: PackEntity, status: HttpStatus.OK})
    createCategory(@Body() body: PackDTO, @User() user: UserEntity): Promise<PackEntity>{
        return this.packService.createPack(body, user._id);
    }

    @Put('/hidePack')
    @ApiResponse({type: Boolean, status: HttpStatus.OK})
    hidePack(@Body() ids: string[], @User() user: UserEntity): Promise<Boolean>{
        return this.packService.changeState(ids, false, user._id);
    }

    @Put('/publishPack')
    @ApiResponse({type: Boolean, status: HttpStatus.OK})
    publishPack(@Body() ids: string[], @User() user: UserEntity): Promise<Boolean>{
        return this.packService.changeState(ids, true, user._id);
    }

    @Put()
    @ApiResponse({type: PackEntity, status: HttpStatus.OK})
    updatePack(@Body() body: UpdatePackDTO, @User() user: UserEntity): Promise<PackEntity>{
        return this.packService.updatePack(body, user._id);
    }

    @Delete()
    @ApiResponse({type: Boolean, status: HttpStatus.OK})
    deletePack(@Body() ids: string[]): Promise<Boolean>{
        return this.packService.deletePack(ids);
    }
}
