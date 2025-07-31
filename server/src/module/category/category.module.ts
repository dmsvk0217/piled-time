import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "src/auth/auth.module";
import { CategoryController } from "src/module/category/category.controller";
import { CategoryService } from "src/module/category/category.service";
import { Category } from "src/module/category/entities/category.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Category]), forwardRef(() => AuthModule)],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {}
