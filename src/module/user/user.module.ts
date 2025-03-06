import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "src/module/user/user.controller";
import { User } from "src/module/user/user.entity";
import { UserService } from "src/module/user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
