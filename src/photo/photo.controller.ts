import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Body, UseGuards
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoService } from './photo.service';
import { File } from './photo.type';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

const DEFAULT_PHOTOS = ['default-avatar', 'default-brand'];

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@ApiTags('Photo')
@Controller('api/photo')
export class PhotoController {
  constructor(private readonly photoService: PhotoService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  uploadPhoto(@UploadedFile() file: File) {
    return this.photoService.save(file);
  }

  @Delete()
  deletePhoto(@Body() body) {
    if (DEFAULT_PHOTOS.some((p) => p === body.id)) return true;
    return this.photoService.remove(body.id);
  }
}
