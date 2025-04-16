import { NestFactory } from "@nestjs/core";
import { setupApp } from "src/app.setup";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupApp(app);

  await app.listen(process.env.PORT);
}
bootstrap();
