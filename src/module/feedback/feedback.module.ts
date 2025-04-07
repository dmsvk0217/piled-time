import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Feedback } from "src/module/feedback/entities/feedback.entity";
import { FeedbackController } from "src/module/feedback/feedback.controller";
import { FeedbackService } from "src/module/feedback/feedback.service";
import { User } from "src/module/user/entities/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Feedback, User])],
  controllers: [FeedbackController],
  providers: [FeedbackService],
})
export class FeedbackModule {}
