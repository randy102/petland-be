import { Body, Controller, Get, HttpStatus, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles, RolesGuard } from 'src/auth/roles.guard';
import { User } from 'src/user/user.decorator';
import UserEntity, { UserRole } from 'src/user/user.entity';
import { SubCategoryDto, SubCategoryResponseDTO } from './sub-category.dto';
import SubCategoryEntity from './sub-category.entity';
import { SubCategoryService } from './sub-category.service';

@Controller('api/sub-category')
@ApiTags('SubCategory')
@ApiBearerAuth()
export class SubCategoryController {
    constructor( private readonly subCategoryService: SubCategoryService) {}

    @Post('create')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    @ApiResponse({type: SubCategoryEntity, status: HttpStatus.OK})
    createCategory(@Body() body: SubCategoryDto, @User() user: UserEntity): Promise<SubCategoryEntity>{
        return this.subCategoryService.createSubCategory(body, user._id);
    }

    @Get()
    @ApiImplicitQuery({name:'category', required:false})
    @ApiResponse({type: SubCategoryResponseDTO, status: HttpStatus.OK})
    getSubCategories(@Query('category') categoryID: string): Promise<SubCategoryResponseDTO[]>{
        return this.subCategoryService.getSubCategory(categoryID);
    }
}
