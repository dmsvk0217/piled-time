import { OmitType } from "@nestjs/swagger";
import { Category } from "src/module/category/entities/category.entity";

export class CategoryCreateRequest extends OmitType(Category, ["deletedAt"]) {}
