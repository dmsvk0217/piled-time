import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Plan } from "src/module/plan/plan.entity";

@Module({ imports: [TypeOrmModule.forFeature([Plan])] })
export class PlanModule {}
