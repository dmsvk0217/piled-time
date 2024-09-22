import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUpSwagger } from './common/swagger/swagger.setup';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await setUpSwagger(app);
  await app.listen(4000);
}
bootstrap();
