import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Feedback } from "src/module/feedback/entities/feedback.entity";
import { FeedbackType } from "src/module/feedback/enum/feedback.enum";

export class FeedbackCreateRequest extends OmitType(Feedback, [
  "user",
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {
  @ApiProperty({ example: FeedbackType.DAILY, description: "피드벡 타입" })
  @IsNotEmpty()
  @IsEnum(FeedbackType)
  type: FeedbackType;

  @ApiProperty({ example: "2025-01-01", description: "피드백 날짜" })
  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  date: Date;

  @ApiProperty({ example: "this is good point", description: "좋았던 점" })
  @IsString()
  goodPoint: string;

  @ApiProperty({ example: "this is badpoint", description: "나빴던 점" })
  @IsString()
  badPoint: string;

  @ApiProperty({ example: "this is comment", description: "기타 사항" })
  @IsString()
  comment: string;
}
