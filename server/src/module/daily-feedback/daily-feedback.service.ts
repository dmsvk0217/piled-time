import { Injectable } from '@nestjs/common';
import { CreateDailyFeedbackDto } from './dto/create-daily-feedback.dto';
import { UpdateDailyFeedbackDto } from './dto/update-daily-feedback.dto';

@Injectable()
export class DailyFeedbackService {
  create(createDailyFeedbackDto: CreateDailyFeedbackDto) {
    return 'This action adds a new dailyFeedback';
  }

  findAll() {
    return `This action returns all dailyFeedback`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dailyFeedback`;
  }

  update(id: number, updateDailyFeedbackDto: UpdateDailyFeedbackDto) {
    return `This action updates a #${id} dailyFeedback`;
  }

  remove(id: number) {
    return `This action removes a #${id} dailyFeedback`;
  }
}
