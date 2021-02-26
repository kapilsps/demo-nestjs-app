import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as expressLayout from 'express-ejs-layouts';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const PORT = process.env.HTTP_PORT || 3000;

  app.use(expressLayout);
  app.set("layout extractScripts", true)
  app.set('layout', join(__dirname, '..', 'views', 'layouts', 'app-layout.ejs'));
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.useStaticAssets(join(__dirname, '..', 'node_modules', '@fortawesome'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');

  console.log(`Listening on port ${PORT}`);
  await app.listen(PORT);
}
bootstrap();
