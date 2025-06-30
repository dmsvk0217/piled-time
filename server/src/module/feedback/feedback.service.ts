import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import {
  FeedbackCreateRequest,
  FeedbackResponse,
  FeedbackUpdateRequest,
} from "src/module/feedback/dto";
import { Feedback } from "src/module/feedback/entities/feedback.entity";
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
    const feedback = this.feedbackRepository.create({ ...request, user });
    const result = await this.feedbackRepository.save(feedback);
    return plainToInstance(FeedbackResponse, result);
  }

  async findAll(user: User, type?: string, date?: string): Promise<FeedbackResponse[]> {
    const where: any = { user: { id: user.id } };
    if (type) where.type = type;
    if (date) {
      const start = new Date(date);
      start.setHours(0, 0, 0, 0);
      const end = new Date(date);
      end.setHours(23, 59, 59, 999);
      where.date = Between(start, end);
    }
    const feedbacks = await this.feedbackRepository.find({ where });
    return feedbacks.map((feedback) => plainToInstance(FeedbackResponse, feedback));
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
