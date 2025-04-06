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
  @Expose()
  @ApiProperty({ type: () => UserResponse })
  user: UserResponse;

  @Expose()
  type: FeedbackType;

  @Expose()
  date: Date;

  @Expose()
  goodPoint: string;

  @Expose()
  badPoint: string;

  @Expose()
  comment: string;

  @Expose()
  name: string;

  @Expose()
  color: string;
}
