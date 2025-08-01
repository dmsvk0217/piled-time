import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "node:path";
import { AuthModule } from "src/auth/auth.module";
import { TypeOrmConfigProvider } from "src/common/database/provider/database-config.provider";
import { CsrfMiddleware } from "src/common/middleware/csrf.middleware";
import { ActionModule } from "src/module/action/action.module";
import { CategoryModule } from "src/module/category/category.module";
import { FeedbackModule } from "src/module/feedback/feedback.module";
import { MemoModule } from "src/module/memo/memo.module";
import { PlanModule } from "src/module/plan/plan.module";
import { PlannerModule } from "src/module/planner/planner.module";
import { TodoModule } from "src/module/todo/todo.module";
import { UserModule } from "src/module/user/user.module";

const envFilePath = (() => {
  switch (process.env.NODE_ENV) {
    case "development":
      return join(__dirname, "..", ".env.development");
    case "local":
      return join(__dirname, "..", ".env.local");
    case "production":
      return join(__dirname, "..", ".env.production");
  }
})();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
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
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CsrfMiddleware).forRoutes({ path: "*", method: RequestMethod.ALL });
  }
}
