import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { GetUser } from "src/common/decorators/user.decorator";
import { CrudDocs } from "src/common/docs/crud-docs.decorator";
import { CategoryService } from "src/module/category/category.service";
import { CategoryDocs } from "src/module/category/decorator/swagger";
import {
  CategoryCreateRequest,
  CategoryResponse,
  CategoryUpdateRequest,
} from "src/module/category/dto";
import { User } from "src/module/user/entities/user.entity";

@ApiTags("Category")
@UseGuards(JwtAuthGuard)
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @CrudDocs.create(CategoryDocs.create)
  @Post()
  create(@Body() request: CategoryCreateRequest, @GetUser() user: User): Promise<CategoryResponse> {
    return this.categoryService.create(request, user);
  }

  @CrudDocs.findAll(CategoryDocs.findAll)
  @Get()
  findAll(@GetUser() user: User): Promise<CategoryResponse[]> {
    return this.categoryService.findAll(user);
  }

  @CrudDocs.findOne(CategoryDocs.findOne)
  @Get(":id")
  findOne(@Param("id") id: number, @GetUser() user: User): Promise<CategoryResponse> {
    return this.categoryService.findOne(id, user);
  }

  @CrudDocs.update(CategoryDocs.update)
  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() request: CategoryUpdateRequest,
    @GetUser() user: User
  ): Promise<CategoryResponse> {
    return this.categoryService.update(id, request, user);
  }

  @HttpCode(204)
  @CrudDocs.remove(CategoryDocs.remove)
  @Delete(":id")
  remove(@Param("id") id: number, @GetUser() user: User): Promise<void> {
    return this.categoryService.remove(id, user);
  }
}
