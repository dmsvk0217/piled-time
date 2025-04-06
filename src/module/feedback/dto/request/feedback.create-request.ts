import { OmitType } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { Feedback } from "src/module/feedback/entities/feedback.entity";

export class FeedbackCreateRequest extends OmitType(Feedback, [
  "user",
  "id",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  color: string;
}
