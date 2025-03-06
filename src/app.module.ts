import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigProvider } from "./common/database/provider/database-config.provider";
import { CategoryModule } from "./module/category/category.module";
import { FeedbackModule } from "./module/feedback/feedback.module";
import { UserModule } from "./module/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => TypeOrmConfigProvider.forRoot(),
    }),
    UserModule,
    CategoryModule,
    FeedbackModule,
  ],
})
export class AppModule {}
