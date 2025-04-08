import { ApiProperty, OmitType } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Category } from "src/module/category/entities/category.entity";

export class CategoryCreateRequest extends OmitType(Category, [
  "user",
  "todos",
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {
  @ApiProperty({ example: "독서", description: "카테고리 이름" })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: "#FFFFFF", description: "헥스 컬러 코드" })
  @IsString()
  @IsNotEmpty()
  color: string;
}
