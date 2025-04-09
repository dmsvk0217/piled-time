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

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findAll(): Promise<UserResponse[]> {
    const categories = await this.userRepository.find();
    return categories.map((User) => plainToInstance(UserResponse, User));
  }

  async findOne(id: number): Promise<UserResponse> {
    const result = await this.findById(id);
    return plainToInstance(UserResponse, result);
  }

  async update(id: number, request: UserUpdateRequest): Promise<UserResponse> {
    const User = await this.findById(id);
    this.userRepository.merge(User, request);
    const result = await this.userRepository.save(User);
    return plainToInstance(UserResponse, result);
  }

  async remove(id: number): Promise<void> {
    const User = await this.findById(id);
    await this.userRepository.softRemove(User);
  }

  private async findById(id: number): Promise<User> {
    const User = await this.userRepository.findOne({ where: { id } });
    if (!User) throw UserException.NOT_EXISTS;
    return User;
  }
}
