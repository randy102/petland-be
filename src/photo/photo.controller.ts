import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  Delete,
  Body,
  UseGuards,
  Param,
  HttpStatus,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PhotoService } from './photo.service';
import { File } from './photo.type';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { PhotoUploadDto } from './photo.dto';



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
    return this.photoService.save(file);
  }

  @Delete(':id')
  @ApiResponse({type: Boolean, status: HttpStatus.OK})
  deletePhoto(@Param('id') id: string): Promise<boolean> {
    return this.photoService.remove(id);
  }
}
