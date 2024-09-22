import { PartialType } from '@nestjs/swagger';
import { CreateDailyFeedbackDto } from './create-daily-feedback.dto';

export class UpdateDailyFeedbackDto extends PartialType(CreateDailyFeedbackDto) {}
