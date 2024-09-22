import { Module } from '@nestjs/common';
import { DailyFeedbackService } from './daily-feedback.service';
import { DailyFeedbackController } from './daily-feedback.controller';

@Module({
  controllers: [DailyFeedbackController],
  providers: [DailyFeedbackService],
})
export class DailyFeedbackModule {}
