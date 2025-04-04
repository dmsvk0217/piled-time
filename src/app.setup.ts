import { ClassSerializerInterceptor, INestApplication } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { setUpSwagger } from "src/common/swagger/swagger.setup";
import { GlobalExceptionFilter } from "src/errors/filters/global-exception.filter";
import { GlobalValidationPipe } from "src/errors/pipes/global-validation.pipe";

export function setupApp(app: INestApplication) {
  setUpSwagger(app);

  app.useGlobalPipes(
    new GlobalValidationPipe({
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
}
