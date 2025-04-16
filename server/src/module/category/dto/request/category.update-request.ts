import { PartialType } from "@nestjs/swagger";
import { CategoryCreateRequest } from "src/module/category/dto/request/category.create-request";

export class CategoryUpdateRequest extends PartialType(CategoryCreateRequest) {}
