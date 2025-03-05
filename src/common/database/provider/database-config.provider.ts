import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";
import { SnakeNamingStrategy } from "typeorm-naming-strategies";

@Injectable()
export class TypeOrmConfigProvider {
  public static forRoot(): TypeOrmModuleOptions {
    return {
      type: "postgres",
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: String(process.env.DATABASE_PASSWORD),
      database: process.env.DATABASE_NAME,
      entities: [join(__dirname, "**", "*.entity.{ts,js}")],
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
      logging: true,
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
