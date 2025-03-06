import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Action } from "src/module/action/action.entity";

@Module({ imports: [TypeOrmModule.forFeature([Action])] })
export class ActionModule {}
