import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // 静态资源配置
  // 配置静态资源目录
  app.useStaticAssets(join(__dirname, '../src/', 'public'), {
    prefix: '/static/'
  })
  // 允许跨域
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('二手兔后台API接口文档')
    .setDescription('浊雨不语-Muddyrain')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api-docs', app, document);
  await app.listen(3000);
}
bootstrap();
