import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DtoValidationPipe } from './commons/dto-validator.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useGlobalPipes(new DtoValidationPipe())
  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('PetLand API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {customCssUrl: '/css/theme-newspaper.css'});
  app.enableCors();
  await app.listen(process.env.PORT || 8080);
}
bootstrap();
