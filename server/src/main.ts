import { NestFactory } from "@nestjs/core";
import { setupApp } from "src/app.setup";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setupApp(app);

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`🚀  Application is running on: port ${port}`);
}
bootstrap();
