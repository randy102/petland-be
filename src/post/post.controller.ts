import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Public } from '../auth/jwt-auth.guard';
import { Roles, RolesGuard } from '../auth/roles.guard';
import { CreatePostDTO, PostResponseDTO, RejectPostDTO, UpdatePostDTO } from './post.dto';
import { User } from '../user/user.decorator';
import UserEntity, { UserRole } from '../user/user.entity';
import PostEntity from './post.entity';

@Controller('api/post')
@ApiTags('Post')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @Get('user')
  @ApiResponse({
    type: [PostResponseDTO],
    description: 'User can see his posts'
  })
  getUserPost(@User() user: UserEntity): Promise<PostResponseDTO[]> {
    return this.postService.getByUser(user._id);
  }



  @Get('public/highlight')
  @Public()
  @ApiResponse({
    type: [PostResponseDTO],
    description: 'Get all highlight posts'
  })
  getHighlightPost(): Promise<PostResponseDTO[]>{
    return this.postService.getHighlight();
  }

  @Get('public')
  @Public()
  @ApiResponse({
    type: [PostResponseDTO],
    description: 'Get all public posts'
  })
  getPublicPost(): Promise<PostResponseDTO[]>{
    return this.postService.getPublic();
  }

  @Get(':id')
  @Public()
  @ApiResponse({
    type: PostResponseDTO,
    description: 'Post detail'
  })
  getDetail(@Param('id') id: string): Promise<PostResponseDTO>{
    return this.postService.getDetail(id)
  }

  @Get()
  @ApiResponse({
    type: [PostResponseDTO],
    description: 'Admin, Mod can see all posts'
  })
  @Roles(UserRole.ADMIN)
  getAllPost(): Promise<PostResponseDTO[]> {
    return this.postService.getAll();
  }

  @Post()
  @ApiResponse({
    type: PostEntity,
    description: 'User can create post in draft'
  })
  createPost(@Body() body: CreatePostDTO, @User() user: UserEntity): Promise<PostEntity> {
    return this.postService.create(body, user._id);
  }

  @Put()
  @ApiResponse({
    type: PostEntity,
    description: 'User can update his own post, then post return to draft'
  })
  updatePost(@Body() body: UpdatePostDTO, @User() user: UserEntity): Promise<PostEntity> {
    return this.postService.update(body, user._id);
  }

  @Put('confirm/:id')
  @ApiResponse({
    type: PostEntity,
    description: 'User can submit his own post, then post\'s state change to pending so that admin can verify'
  })
  confirmPost(@Param('id') id: string, @User() user: UserEntity): Promise<PostEntity> {
    return this.postService.confirmPost(id, user._id);
  }

  @Put('hide/:id')
  @ApiResponse({
    type: PostEntity,
    description: 'User can hide post in published, then post\'s state change to hidden'
  })
  hidePost(@Param('id') id: string, @User() user: UserEntity): Promise<PostEntity> {
    return this.postService.hidePost(id, user._id);
  }

  @Put('publish/:id')
  @ApiResponse({
    type: PostEntity,
    description: 'User can published post in hidden, then post\'s state change to published'
  })
  publishPost(@Param('id') id: string, @User() user: UserEntity): Promise<PostEntity> {
    return this.postService.publishPost(id, user._id);
  }

  @Put('cancel/:id')
  @ApiResponse({
    type: PostEntity,
    description: 'User can cancel submit post in pending, then post return to draft'
  })
  cancelPost(@Param('id') id: string, @User() user: UserEntity): Promise<PostEntity> {
    return this.postService.cancelPost(id, user._id);
  }

  @Put('verify/:id')
  @Roles(UserRole.ADMIN, UserRole.MOD)
  @ApiResponse({
    type: PostEntity,
    description: 'Admin, MOD can verify submit post in pending, then post change to published'
  })
  verifyPost(@Param('id') id: string, @User() user: UserEntity): Promise<PostEntity> {
    return this.postService.verifyPost(id, user._id);
  }

  @Put('reject/:id')
  @Roles(UserRole.ADMIN, UserRole.MOD)
  @ApiResponse({
    type: PostEntity,
    description: 'Admin, MOD can reject submit post in pending, then post change to rejected'
  })
  rejectPost(@Param('id') id: string, @Body() body: RejectPostDTO, @User() user: UserEntity): Promise<PostEntity> {
    return this.postService.rejectPost(id, body, user._id);
  }

  @Delete(':id')
  @ApiResponse({
    type: Boolean,
    description: 'User can delete post'
  })
  deletePost(@Param('id') id: string, @User() user: UserEntity): Promise<boolean> {
    return this.postService.deletePost(id, user._id);
  }
}
