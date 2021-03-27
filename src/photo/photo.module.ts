import {Module} from '@nestjs/common';
import {PhotoService} from './photo.service';
import {PhotoController} from './photo.controller';
import {UtilsModule} from '../utils/utils.module';

@Module({
  providers: [PhotoService],
  imports: [UtilsModule],
  controllers: [PhotoController],
  exports: [PhotoService]
})
export class PhotoModule {
}
