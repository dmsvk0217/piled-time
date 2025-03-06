import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeOrmConfigProvider } from "src/common/database/provider/database-config.provider";
import { CategoryModule } from "src/module/category/category.module";
import { FeedbackModule } from "src/module/feedback/feedback.module";
import { MemoModule } from "src/module/memo/memo.module";
import { UserModule } from "src/module/user/user.module";

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
    MemoModule,
  ],
})
export class AppModule {}
