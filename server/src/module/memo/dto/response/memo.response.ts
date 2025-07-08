import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseResponseDto } from "src/common/database/dto/base-response.dto";
import { Memo } from "src/module/memo/entities/memo.entity";

export class MemoResponse extends IntersectionType(
  OmitType(Memo, ["user"] as const),
  BaseResponseDto,
) {
  @ApiProperty({ example: "2025-01-01", description: "메모작성 날짜" })
  @Expose()
  date: Date;

  @ApiProperty({ example: "this is content", description: "메모 내용" })
  @Expose()
  content: string;
}
