import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class BaseResponseDto {
  @ApiProperty({ example: "1", description: "id" })
  @Expose()
  id: number;

  @ApiProperty({ example: "2025-01-01T00:00:00", description: "생성일" })
  @Expose()
  createdAt: Date;

  @ApiProperty({ example: "2025-01-01T00:00:00", description: "수정일" })
  @Expose()
  updatedAt: Date;

  @ApiProperty({ example: "2025-01-01T00:00:00", description: "삭제일" })
  @Expose()
  deletedAt: Date;
}
