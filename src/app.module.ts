import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import TypeOrmConfigService from './config/TypeOrm';
import { ConfigModule } from '@nestjs/config';
import { UtilsModule } from './utils/utils.module';
import { PhotoModule } from './photo/photo.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { CityModule } from './city/city.module';
import { DistrictModule } from './district/district.module';
import { SubCategoryController } from './sub-category/sub-category.controller';
import { SubCategoryModule } from './sub-category/sub-category.module';
import { SubCategoryService } from './sub-category/sub-category.service';
import { PostModule } from './post/post.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: TypeOrmConfigService }),
    ConfigModule.forRoot({ isGlobal: true }),
    ServeStaticModule.forRoot({ rootPath: join(__dirname, '..', 'public')}),
    UtilsModule,
    PhotoModule,
    CategoryModule,
    UserModule,
    AuthModule,
    CityModule,
    DistrictModule,
    SubCategoryModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
