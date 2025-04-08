import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CrudDocs } from "src/common/docs/crud-docs.decorator";
import { CategoryService } from "src/module/category/category.service";
import { CategoryDocs } from "src/module/category/decorator/swagger";
import {
  CategoryCreateRequest,
  CategoryResponse,
  CategoryUpdateRequest,
} from "src/module/category/dto";

@ApiTags("category")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @CrudDocs.create(CategoryDocs.create)
  @Post()
  create(@Body() request: CategoryCreateRequest): Promise<CategoryResponse> {
    return this.categoryService.create(request);
  }

  @CrudDocs.findAll(CategoryDocs.findAll)
  @Get()
  findAll(): Promise<CategoryResponse[]> {
    return this.categoryService.findAll();
  }

  @CrudDocs.findOne(CategoryDocs.findOne)
  @Get(":id")
  findOne(@Param("id") id: number): Promise<CategoryResponse> {
    return this.categoryService.findOne(id);
  }

  @CrudDocs.update(CategoryDocs.update)
  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() request: CategoryUpdateRequest
  ): Promise<CategoryResponse> {
    return this.categoryService.update(id, request);
  }

  @HttpCode(204)
  @CrudDocs.remove(CategoryDocs.remove)
  @Delete(":id")
  remove(@Param("id") id: number): Promise<void> {
    return this.categoryService.remove(id);
  }
}
