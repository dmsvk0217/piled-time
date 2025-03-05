import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigProvider } from "./common/database/provider/database-config.provider";
import { UserModule } from "./module/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => TypeOrmConfigProvider.forRoot(),
    }),
    UserModule,
  ],
})
export class AppModule {}
