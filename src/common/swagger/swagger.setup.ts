import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export async function setUpSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle("API Docs")
    .setDescription("NestJS Swagger example")
    .setVersion("1.0")
    .addBearerAuth(
      {
        type: "http",
        name: "Authorization",
        description: "JWT 인증 토큰",
        in: "header",
      },
      "Authorization"
    )
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup("swagger", app, document);
}
