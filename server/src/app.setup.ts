import { ClassSerializerInterceptor, INestApplication } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { LoggingInterceptor } from "src/common/logging/logger.interceptor";
import { setUpSwagger } from "src/common/swagger/swagger.setup";
import { GlobalExceptionFilter } from "src/errors/filters/global-exception.filter";
import { GlobalValidationPipe } from "src/errors/pipes/global-validation.pipe";

export function setupApp(app: INestApplication) {
  setUpSwagger(app);

  app.setGlobalPrefix("api");

  app.useGlobalPipes(
    new GlobalValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: { enableImplicitConversion: true },
    })
  );

  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector), {
      excludeExtraneousValues: true,
    })
  );

  app.useGlobalInterceptors(new LoggingInterceptor());

  app.useGlobalFilters(new GlobalExceptionFilter());
}
