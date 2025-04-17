import { NestFactory } from '@nestjs/core';

import { setupApp } from './setup-app';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  setupApp(app)
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
