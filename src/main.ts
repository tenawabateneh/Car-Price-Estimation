import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
const cookieSession = require('cookie-session')

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))

  app.use(
    cookieSession({
      keys: ["wowwow"]
    })
  )
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
