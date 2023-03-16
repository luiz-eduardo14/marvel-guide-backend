import { NestFactory } from '@nestjs/core';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { AppModule } from './app.module.js';
const __dirname = fileURLToPath(dirname(import.meta.url));

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
