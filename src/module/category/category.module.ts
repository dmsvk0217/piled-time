import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoryController } from "src/module/category/category.controller";
import { CategoryService } from "src/module/category/category.service";
import { Category } from "src/module/category/entities/category.entity";
import { User } from "src/module/user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category, User])],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
