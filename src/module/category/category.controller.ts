import { Body, Controller, Delete, Get, HttpCode, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CategoryService } from "src/module/category/category.service";
import { CategoryCreateRequest, CategoryUpdateRequest } from "src/module/category/dto";
import { FindAllDocs, FindOneDocs, RemoveDocs, SaveDocs, UpdateDocs } from "./decorator/swagger";

@ApiTags("category")
@Controller("categories")
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @SaveDocs()
  @Post()
  create(@Body() request: CategoryCreateRequest) {
    return this.categoryService.create(request);
  }

  @FindAllDocs()
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @FindOneDocs()
  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.categoryService.findOne(id);
  }

  @UpdateDocs()
  @Patch(":id")
  update(@Param("id") id: number, @Body() request: CategoryUpdateRequest) {
    return this.categoryService.update(id, request);
  }

  @HttpCode(204)
  @RemoveDocs()
  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.categoryService.remove(id);
  }
}
