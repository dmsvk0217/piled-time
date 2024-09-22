import { PartialType } from '@nestjs/swagger';
import { CreateWeeklyFeedbackDto } from './create-weekly-feedback.dto';

export class UpdateWeeklyFeedbackDto extends PartialType(CreateWeeklyFeedbackDto) {}
