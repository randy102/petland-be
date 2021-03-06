import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { log } from 'node:console';
import { JwtAuthGuard, Public } from 'src/auth/jwt-auth.guard';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/user/user.decorator';
import UserEntity, { UserRole } from 'src/user/user.entity';
import { CreateQaDTO, DeleteQaDto, EditQaDTO, QaResponseDTO } from './qa.dto';
import QaEntity from './qa.entity';
import { QaService } from './qa.service';

@Controller('api/qa')
@ApiTags('Qa')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class QaController{
    constructor(private readonly qaService: QaService) {
    }

    @Post()
    @ApiResponse({ type: QaEntity, status: HttpStatus.OK})
    createQa(@Body() body: CreateQaDTO, @User() user: UserEntity): Promise<QaEntity>{
        return this.qaService.createQa(body, user._id);
    }

    @Get()
    @Public()
    @ApiResponse({type: [QaResponseDTO], status: HttpStatus.OK})
    QaList(@Query('postID') id: string): Promise<QaResponseDTO[]>{
        return this.qaService.qaList(id);
    }

    @Put()
    @ApiResponse({type: QaEntity, status: HttpStatus.OK})
    editQa(@Body() body: EditQaDTO, @User() user: UserEntity): Promise<QaEntity>{
        return this.qaService.editQa(body, user._id);
    }

    @Delete()
    @ApiResponse({type: Boolean, status: HttpStatus.OK})
    deleteQa(@Body() body: DeleteQaDto,@User() user: UserEntity): Promise<Boolean>{
        return this.qaService.deleteQa(body, user._id);
    }
}
