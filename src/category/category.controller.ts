import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/user/user.decorator';
import { UserRole } from 'src/user/user.entity';
import { CategoryDto, UpdateCategoryDto } from './category.dto';
import CategoryEntity from './category.entity';
import { CategoryService } from './category.service';

@Controller('api/category')
@ApiTags('Category')
@ApiBearerAuth()
export class CategoryController {
    constructor(private readonly categoryService: CategoryService){}
    
    @Post('create')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiResponse({type: CategoryEntity, status: HttpStatus.OK})
    createCategory(@Body() body: CategoryDto): Promise<CategoryEntity>{
        return this.categoryService.createCategory(body);
    }

    @Get('list')
    @ApiResponse({type: CategoryEntity, status: HttpStatus.OK})
    getCategories(): Promise<CategoryEntity[]>{
        return this.categoryService.getCategories();
    }

    @Put('update')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiResponse({type: CategoryEntity, status: HttpStatus.OK})
    updateCategory(@Body() body: UpdateCategoryDto): Promise<CategoryEntity>{
        return this.categoryService.updateCategory(body);
    }

    @Delete('delete/:id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiResponse({type: CategoryEntity, status: HttpStatus.OK})
    deleteCategory(@Param('id') id: string): Promise<Boolean>{
        return this.categoryService.deleteCategory(id);
    }
}
