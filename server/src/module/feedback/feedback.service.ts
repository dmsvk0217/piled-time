import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { getDayRange, getWeekRange } from "src/common/utils/date.utils";
import {
  FeedbackCreateRequest,
  FeedbackResponse,
  FeedbackUpdateRequest,
} from "src/module/feedback/dto";
import { Feedback } from "src/module/feedback/entities/feedback.entity";
import { FeedbackType } from "src/module/feedback/enum/feedback.enum";
import { FeedbackException } from "src/module/feedback/errors/feedback.exception";
import { User } from "src/module/user/entities/user.entity";
import { Between, Repository } from "typeorm";

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>
  ) {}

  async create(request: FeedbackCreateRequest, user: User): Promise<FeedbackResponse> {
    await this.checkDuplicateFeedback(user, request.type, request.date);

    const feedback = this.feedbackRepository.create({ ...request, user });
    const result = await this.feedbackRepository.save(feedback);
    return plainToInstance(FeedbackResponse, result);
  }

  private async checkDuplicateFeedback(user: User, type: FeedbackType, date: Date): Promise<void> {
    const where: any = { user: { id: user.id }, type };

    const { start, end } = type === FeedbackType.WEEKLY ? getWeekRange(date) : getDayRange(date);
    where.date = Between(start, end);

    const existing = await this.feedbackRepository.findOne({ where });
    if (existing) throw FeedbackException.ALREADY_EXISTS;
  }

  async findAll(user: User, type?: string, date?: string): Promise<FeedbackResponse[]> {
    const where: any = { user: { id: user.id } };
    if (type) where.type = type;
    if (date) {
      const { start, end } = type === "weekly" ? getWeekRange(date) : getDayRange(date);
      where.date = Between(start, end);
    }

    const feedbacks = await this.feedbackRepository.find({ where });
    return feedbacks.map((feedback) => plainToInstance(FeedbackResponse, feedback));
  }

  async findDailyByDate(user: User, date: string): Promise<FeedbackResponse> {
    const { start, end } = getDayRange(date);

    const feedback = await this.feedbackRepository.findOne({
      where: {
        user: { id: user.id },
        type: FeedbackType.DAILY,
        date: Between(start, end),
      },
    });

    return plainToInstance(FeedbackResponse, feedback);
  }

  async findWeeklyByDate(user: User, date: string): Promise<FeedbackResponse> {
    const { start, end } = getWeekRange(date);

    const feedback = await this.feedbackRepository.findOne({
      where: {
        user: { id: user.id },
        type: FeedbackType.WEEKLY,
        date: Between(start, end),
      },
    });

    return plainToInstance(FeedbackResponse, feedback);
  }

  async findDailyFeedbacksInWeek(user: User, date: string): Promise<FeedbackResponse[]> {
    const { start, end } = getWeekRange(date);

    const feedbacks = await this.feedbackRepository.find({
      where: {
        user: { id: user.id },
        type: FeedbackType.DAILY,
        date: Between(start, end),
      },
    });

    return feedbacks.map((f) => plainToInstance(FeedbackResponse, f));
  }

  async findOne(id: number, user: User): Promise<FeedbackResponse> {
    const result = await this.findById(id, user);
    return plainToInstance(FeedbackResponse, result);
  }

  async update(id: number, request: FeedbackUpdateRequest, user: User): Promise<FeedbackResponse> {
    const feedback = await this.findById(id, user);
    this.feedbackRepository.merge(feedback, request);
    const result = await this.feedbackRepository.save(feedback);
    return plainToInstance(FeedbackResponse, result);
  }

  async remove(id: number, user: User): Promise<void> {
    const feedback = await this.findById(id, user);
    await this.feedbackRepository.softRemove(feedback);
  }

  private async findById(id: number, user: User): Promise<Feedback> {
    const feedback = await this.feedbackRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!feedback) throw FeedbackException.NOT_EXISTS;
    return feedback;
  }
}
