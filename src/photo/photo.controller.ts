import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  UseGuards,
  Param,
  HttpStatus, Put
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoService } from './photo.service';
import { File } from './photo.type';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PhotoUpdateDto, PhotoUploadDto } from './photo.dto';



@Controller('api/photo')
@ApiTags('Photo')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({ type: PhotoUploadDto })
  uploadPhoto(@UploadedFile() file: File): Promise<string> {
    return this.photoService.create(file);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({ type: PhotoUpdateDto })
  updatePhoto(@Param('id') id: string, @UploadedFile() file: File): Promise<string> {
    return this.photoService.upload(file, id);
  }

  @Delete(':id')
  @ApiResponse({type: Boolean, status: HttpStatus.OK})
  deletePhoto(@Param('id') id: string): Promise<boolean> {
    return this.photoService.remove(id);
  }
}
