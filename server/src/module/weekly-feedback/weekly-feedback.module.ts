import { Module } from '@nestjs/common';
import { WeeklyFeedbackService } from './weekly-feedback.service';
import { WeeklyFeedbackController } from './weekly-feedback.controller';

@Module({
  controllers: [WeeklyFeedbackController],
  providers: [WeeklyFeedbackService],
})
export class WeeklyFeedbackModule {}
