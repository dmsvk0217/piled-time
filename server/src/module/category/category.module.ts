import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { CategoryController } from "src/module/category/category.controller";
import { CategoryService } from "src/module/category/category.service";
import { Category } from "src/module/category/entities/category.entity";
import { User } from "src/module/user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category, User]), AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
