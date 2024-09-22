import { Injectable } from '@nestjs/common';
import { CreateWeeklyFeedbackDto } from './dto/create-weekly-feedback.dto';
import { UpdateWeeklyFeedbackDto } from './dto/update-weekly-feedback.dto';

@Injectable()
export class WeeklyFeedbackService {
  create(createWeeklyFeedbackDto: CreateWeeklyFeedbackDto) {
    return 'This action adds a new weeklyFeedback';
  }

  findAll() {
    return `This action returns all weeklyFeedback`;
  }

  findOne(id: number) {
    return `This action returns a #${id} weeklyFeedback`;
  }

  update(id: number, updateWeeklyFeedbackDto: UpdateWeeklyFeedbackDto) {
    return `This action updates a #${id} weeklyFeedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} weeklyFeedback`;
  }
}
