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
import { Repository } from "typeorm";

@Injectable()
export class FeedbackService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Feedback)
    private readonly feedbackRepository: Repository<Feedback>
  ) {}

  async create(request: FeedbackCreateRequest, user: User): Promise<FeedbackResponse> {
    const feedback = this.feedbackRepository.create({ ...request, user });
    const result = await this.feedbackRepository.save(feedback);
    return plainToInstance(FeedbackResponse, result);
  }

  async findAll(user: User): Promise<FeedbackResponse[]> {
    const categories = await this.feedbackRepository.find();
    return categories.map((Feedback) => plainToInstance(FeedbackResponse, Feedback));
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
      relations: ["user"],
    });
    if (!feedback) throw FeedbackException.NOT_EXISTS;
    return feedback;
  }
}
