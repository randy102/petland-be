import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles, RolesGuard } from '../auth/roles.guard';
import { CreatePostDTO, PostResponseDTO, UpdatePostDTO } from './post.dto';
import { User } from '../user/user.decorator';
import UserEntity, { UserRole } from '../user/user.entity';
import PostEntity from './post.entity';

@Controller('api/post')
@ApiTags('Post')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get('user')
  @ApiResponse({type: PostResponseDTO, description: "User's post"})
  getUserPost(@User() user: UserEntity): Promise<PostResponseDTO[]>{
    return this.postService.getByUser(user._id);
  }

  @Get()
  @ApiResponse({type: PostResponseDTO})
  @Roles(UserRole.ADMIN)
  getAllPost(): Promise<PostResponseDTO[]>{
    return this.postService.getAll();
  }

  @Post()
  @ApiResponse({type: PostEntity, description:'For creating post'})
  createPost(@Body() body: CreatePostDTO, @User() user: UserEntity): Promise<PostEntity>{
    return this.postService.create(body, user._id);
  }

  @Put()
  @ApiResponse({type: PostEntity})
  updatePost(@Body() body: UpdatePostDTO, @User() user: UserEntity): Promise<PostEntity>{
    return this.postService.update(body, user._id);
  }

  @Put('confirm/:id')
  @ApiResponse({type: PostEntity, description: 'For submitting post after create'})
  confirmPost(@Param('id') id: string, @User() user: UserEntity): Promise<PostEntity>{
    return this.postService.confirmPost(id, user._id);
  }

}
