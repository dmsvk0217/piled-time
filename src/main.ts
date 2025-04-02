import { NestFactory } from "@nestjs/core";
import { setUpSwagger } from "src/common/swagger/swagger.setup";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setUpSwagger(app);

  await app.listen(process.env.PORT);
}
bootstrap();
