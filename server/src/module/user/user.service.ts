import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { UserResponse, UserUpdateRequest } from "src/module/user/dto";
import { User } from "src/module/user/entities/user.entity";
import { UserException } from "src/module/user/errors/user.exception";
import { Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(data: Partial<User>): Promise<User> {
    const user = this.userRepository.create(data);
    return await this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<UserResponse[]> {
    const categories = await this.userRepository.find();
    return categories.map((user) => plainToInstance(UserResponse, user));
  }

  async findOne(id: number): Promise<UserResponse> {
    const result = await this.findById(id);
    return plainToInstance(UserResponse, result);
  }

  async update(id: number, request: UserUpdateRequest): Promise<UserResponse> {
    const user = await this.findById(id);
    this.userRepository.merge(user, request);
    const result = await this.userRepository.save(user);
    return plainToInstance(UserResponse, result);
  }

  async remove(id: number): Promise<void> {
    const user = await this.findById(id);
    await this.userRepository.softRemove(user);
  }

  private async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) throw UserException.NOT_EXISTS;
    return user;
  }
}
