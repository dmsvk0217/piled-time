import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

@Injectable()
export class TypeOrmConfigProvider {
  public static forRoot(): TypeOrmModuleOptions {
    return {
      type: "mysql",
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: String(process.env.DB_PASSWORD),
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity.js"],
      synchronize: Boolean(process.env.DB_SYNCHRONIZE),
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
