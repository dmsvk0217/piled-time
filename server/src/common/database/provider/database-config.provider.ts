import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export class TypeOrmConfigProvider {
  public static forRoot(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
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
