import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Action } from "rxjs/internal/scheduler/Action";
import { ActionModule } from "src/module/action/action.module";
import { Feedback } from "src/module/feedback/entities/feedback.entity";
import { FeedbackModule } from "src/module/feedback/feedback.module";
import { Plan } from "src/module/plan/entities/plan.entity";
import { PlanModule } from "src/module/plan/plan.module";
import { Todo } from "src/module/todo/entities/todo.entity";
import { TodoModule } from "src/module/todo/todo.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Todo, Plan, Action, Feedback]),
    TodoModule,
    PlanModule,
    ActionModule,
    FeedbackModule,
  ],
  controllers: [],
  providers: [],
})
export class PlannerModule {}
