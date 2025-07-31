import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { CategoryModule } from "src/module/category/category.module";
import { User } from "src/module/user/entities/user.entity";
import { UserController } from "src/module/user/user.controller";
import { UserService } from "src/module/user/user.service";

@Module({
  imports: [TypeOrmModule.forFeature([User]), CategoryModule, forwardRef(() => AuthModule)],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
