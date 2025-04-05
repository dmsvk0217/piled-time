import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoryService } from "src/module/category/category.service";
import {
  CategoryCreateRequest,
  CategoryResponse,
  CategoryUpdateRequest,
} from "src/module/category/dto";
import { CreateDocs, FindAllDocs, FindOneDocs, RemoveDocs, UpdateDocs } from "./decorator/swagger";

@ApiTags("category")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @CreateDocs()
  @Post()
  create(@Body() request: CategoryCreateRequest): Promise<CategoryResponse> {
    return this.categoryService.create(request);
  }

  @FindAllDocs()
  @Get()
  findAll(): Promise<CategoryResponse[]> {
    return this.categoryService.findAll();
  }

  @FindOneDocs()
  @Get(":id")
  findOne(@Param("id") id: number): Promise<CategoryResponse> {
    return this.categoryService.findOne(id);
  }

  @UpdateDocs()
  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() request: CategoryUpdateRequest
  ): Promise<CategoryResponse> {
    return this.categoryService.update(id, request);
  }

  @HttpCode(204)
  @RemoveDocs()
  @Delete(":id")
  remove(@Param("id") id: number): Promise<void> {
    return this.categoryService.remove(id);
  }
}
