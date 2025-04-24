import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { ServeStaticModule } from "@nestjs/serve-static";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "node:path";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmConfigProvider } from "src/common/database/provider/database-config.provider";
import { ActionModule } from "src/module/action/action.module";
import { CategoryModule } from "src/module/category/category.module";
import { FeedbackModule } from "src/module/feedback/feedback.module";
import { MemoModule } from "src/module/memo/memo.module";
import { PlanModule } from "src/module/plan/plan.module";
import { PlannerModule } from "src/module/planner/planner.module";
import { TodoModule } from "src/module/todo/todo.module";
import { UserModule } from "src/module/user/user.module";

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, "..", "..", "client", "build"),
      exclude: ["/api*"],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, "..", process.env.NODE_ENV === "prod" ? ".env.prod" : ".env"),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => TypeOrmConfigProvider.forRoot(),
    }),
    AuthModule,
    UserModule,
    CategoryModule,
    FeedbackModule,
    MemoModule,
    TodoModule,
    PlanModule,
    ActionModule,
    PlannerModule,
  ],
})
export class AppModule {}
