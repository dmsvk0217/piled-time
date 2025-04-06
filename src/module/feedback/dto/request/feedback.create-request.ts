import { OmitType } from "@nestjs/swagger";
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
  @IsNotEmpty()
  @IsEnum(FeedbackType)
  type: FeedbackType;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsNotEmpty()
  @IsString()
  goodPoint: string;

  @IsNotEmpty()
  @IsString()
  badPoint: string;

  @IsNotEmpty()
  @IsString()
  comment: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  color: string;
}
