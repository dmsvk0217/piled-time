import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsNotEmpty, IsString } from "class-validator";
import { Memo } from "src/module/memo/entities/memo.entity";

export class MemoCreateRequest extends OmitType(Memo, [
  "user",
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {
  @ApiProperty({ example: "2025-01-01", description: "메모작성 날짜" })
  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  date: Date;

  @ApiProperty({ example: "this is content", description: "메모 내용" })
  @IsString()
  @IsNotEmpty()
  content: string;
}
