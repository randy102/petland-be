import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  UseGuards,
  Param,
  HttpStatus, Put, UploadedFiles, Body
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
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
  @UseInterceptors(FilesInterceptor('files'))
  @ApiBody({ type: PhotoUploadDto })
  uploadPhoto(@UploadedFiles() files: File[]): Promise<string[]> {
    return this.photoService.create(files);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({ type: PhotoUpdateDto })
  updatePhoto(@Param('id') id: string, @UploadedFile() file: File): Promise<string> {
    return this.photoService.upload(file, id);
  }

  @Delete()
  @ApiResponse({type: Boolean, status: HttpStatus.OK})
  async deletePhoto(@Body('ids') ids: string[]): Promise<boolean> {
    for(const id of ids){
      await this.photoService.remove(id)
    }
    return true
  }
}
