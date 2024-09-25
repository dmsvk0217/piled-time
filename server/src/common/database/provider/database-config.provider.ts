import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
@Injectable()
export class TypeOrmConfigProvider {
  constructor(private configService: ConfigService) {}

  public static forRoot(): TypeOrmModuleOptions {
    return {
      type: 'mariadb',
      host: process.env.DATABASE_HOST,
      port: +process.env.DATABASE_PORT,
      username: process.env.DATABASE_USER,
      password: String(process.env.DATABASE_PASSWORD),
      database: process.env.DATABASE_NAME,
      logging: true,
      autoLoadEntities: true,
      synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
      namingStrategy: new SnakeNamingStrategy(),
    };
  }
}
