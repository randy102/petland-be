import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard, Public } from 'src/auth/jwt-auth.guard';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/user/user.decorator';
import UserEntity, { UserRole } from 'src/user/user.entity';
import { CategoryDto, DeleteCategoryDto, UpdateCategoryDto } from './category.dto';
import CategoryEntity from './category.entity';
import { CategoryService } from './category.service';

@Controller('api/category')
@ApiTags('Category')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}
    
    @Post()
    @Roles(UserRole.ADMIN)
    @ApiResponse({type: CategoryEntity, status: HttpStatus.OK})
    createCategory(@Body() body: CategoryDto,@User() user: UserEntity): Promise<CategoryEntity>{
        return this.categoryService.createCategory(body, user._id);
    }

    @Get()
    @Public()
    @ApiResponse({type: CategoryEntity, status: HttpStatus.OK})
    getCategories(): Promise<CategoryEntity[]>{
        return this.categoryService.getCategories();
    }

    @Put()
    @Roles(UserRole.ADMIN)
    @ApiResponse({type: CategoryEntity, status: HttpStatus.OK})
    updateCategory(@Body() body: UpdateCategoryDto, @User() user: UserEntity): Promise<CategoryEntity>{
        return this.categoryService.updateCategory(body, user._id);
    }

    @Delete()
    @Roles(UserRole.ADMIN)
    @ApiResponse({type: Boolean,status: HttpStatus.OK})
    deleteCategory(@Body() body: DeleteCategoryDto): Promise<Boolean>{
        return this.categoryService.deleteCategory(body);
    }
}
