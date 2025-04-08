import { ApiProperty, IntersectionType, OmitType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { BaseResponseDto } from "src/common/database/dto/base-response.dto";
import { Feedback } from "src/module/feedback/entities/feedback.entity";
import { FeedbackType } from "src/module/feedback/enum/feedback.enum";
import { UserResponse } from "src/module/user/dto";

export class FeedbackResponse extends IntersectionType(
  OmitType(Feedback, ["user"] as const),
  BaseResponseDto
) {
  @ApiProperty({ type: () => UserResponse })
  @Expose()
  user: UserResponse;

  @ApiProperty({ example: FeedbackType.DAILY, description: "피드벡 타입" })
  @Expose()
  type: FeedbackType;

  @ApiProperty({ example: "2025-01-01", description: "피드백 날짜" })
  @Expose()
  date: Date;

  @ApiProperty({ example: "this is good point", description: "좋았던 점" })
  @Expose()
  goodPoint: string;

  @ApiProperty({ example: "this is badpoint", description: "나빴던 점" })
  @Expose()
  badPoint: string;

  @ApiProperty({ example: "this is comment", description: "기타 사항" })
  @Expose()
  comment: string;
}
