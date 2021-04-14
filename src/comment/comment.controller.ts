import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/user/user.decorator';
import UserEntity from 'src/user/user.entity';
import { CommentResponseDTO, CreateCommentDTO, DeleteCommentDto, EditCommentDTO } from './comment.dto';
import CommentEntity from './comment.entity';
import { CommentService } from './comment.service';

@Controller('api/comment')
@ApiTags('Comment')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class CommentController {
    constructor(private readonly commentService: CommentService){}

    @Post()
    @ApiResponse({ type: CommentEntity, status: HttpStatus.OK})
    createComment(@Body() body: CreateCommentDTO, @User() user: UserEntity): Promise<CommentEntity>{
        return this.commentService.createComment(body, user._id);
    }

    @Get()
    @ApiResponse({ type: [CommentResponseDTO], status: HttpStatus.OK})
    comments(@Query('qaID') id: string): Promise<CommentResponseDTO[]>{
        return this.commentService.comments(id);
    }

    @Put()
    @ApiResponse({ type: CommentEntity, status: HttpStatus.OK})
    editComment(@Body() body: EditCommentDTO, @User() user: UserEntity): Promise<CommentEntity>{
        return this.commentService.editComment(body, user._id);
    }

    @Delete()
    @ApiResponse({ type: Boolean, status: HttpStatus.OK})
    DeleteComment(@Body() body: DeleteCommentDto, @User() user: UserEntity): Promise<Boolean>{
        return this.commentService.deleteComment(body, user._id);
    }
}
