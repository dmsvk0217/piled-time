import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { Plan } from "src/module/plan/entities/plan.entity";
import { PlanController } from "src/module/plan/plan.controller";
import { PlanService } from "src/module/plan/plan.service";
import { TodoModule } from "src/module/todo/todo.module";

@Module({
  imports: [TypeOrmModule.forFeature([Plan]), AuthModule, TodoModule],
  controllers: [PlanController],
  providers: [PlanService],
})
export class PlanModule {}
