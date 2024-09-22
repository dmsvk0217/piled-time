import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigProvider } from 'src/common/database/provider/database-config.provider';
import { DoModule } from 'src/module/do/do.module';
import { CategoryModule } from './module/category/category.module';
import { DailyFeedbackModule } from './module/daily-feedback/daily-feedback.module';
import { MemoModule } from './module/memo/memo.module';
import { PlanModule } from './module/plan/plan.module';
import { TodoListModule } from './module/todo-list/todo-list.module';
import { UserModule } from './module/user/user.module';
import { WeeklyFeedbackModule } from './module/weekly-feedback/weekly-feedback.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => TypeOrmConfigProvider.forRoot(),
    }),
    DoModule,
    PlanModule,
    UserModule,
    WeeklyFeedbackModule,
    DailyFeedbackModule,
    MemoModule,
    TodoListModule,
    CategoryModule,
  ],
})
export class AppModule {}
