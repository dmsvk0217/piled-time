import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { ActionController } from "src/module/action/action.controller";
import { ActionService } from "src/module/action/action.service";
import { Action } from "src/module/action/entities/action.entity";
import { TodoModule } from "src/module/todo/todo.module";
import { User } from "src/module/user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Action, User]), AuthModule, TodoModule],
  controllers: [ActionController],
  providers: [ActionService],
})
export class ActionModule {}
