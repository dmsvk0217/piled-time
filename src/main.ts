import { ClassSerializerInterceptor, ValidationPipe } from "@nestjs/common";
import { NestFactory, Reflector } from "@nestjs/core";
import { setUpSwagger } from "src/common/swagger/swagger.setup";
import { GlobalExceptionFilter } from "src/errors/filters/global-exception.filter";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setUpSwagger(app);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    })
  );
  app.useGlobalFilters(new GlobalExceptionFilter());

  await app.listen(process.env.PORT);
}
bootstrap();
