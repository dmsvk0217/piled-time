import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseResponseDto } from "src/common/database/dto/base-response.dto";
import { Category } from "src/module/category/entities/category.entity";
import { UserResponse } from "src/module/user/dto";

export class CategoryResponse extends IntersectionType(
  OmitType(Category, ["user", "todos"] as const),
  BaseResponseDto
) {
  @Expose()
  @ApiProperty({ type: () => UserResponse })
  user: UserResponse;

  @ApiProperty({ example: "독서", description: "카테고리 이름" })
  @Expose()
  name: string;

  @ApiProperty({ example: "#FFFFFF", description: "헥스 컬러 코드" })
  @Expose()
  color: string;
}
