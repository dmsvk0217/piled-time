import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { UserCreateRequest, UserResponse, UserUpdateRequest } from "src/module/user/dto";
import { User } from "src/module/user/entities/user.entity";
import { UserException } from "src/module/user/errors/user.exception";
import { FindOneOptions, Repository } from "typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async create(request: UserCreateRequest): Promise<UserResponse> {
    const User = this.userRepository.create({ ...request });
    const result = await this.userRepository.save(User);
    return plainToInstance(UserResponse, result);
  }

  async findAll(): Promise<UserResponse[]> {
    const categories = await this.userRepository.find();
    return categories.map((User) => plainToInstance(UserResponse, User));
  }

  async findOne(id: number): Promise<UserResponse> {
    const result = await this.findUserById(id);
    return plainToInstance(UserResponse, result);
  }

  async update(id: number, request: UserUpdateRequest): Promise<UserResponse> {
    const User = await this.findUserById(id);
    this.userRepository.merge(User, request);
    const result = await this.userRepository.save(User);
    return plainToInstance(UserResponse, result);
  }

  async remove(id: number): Promise<void> {
    const User = await this.findUserById(id);
    await this.userRepository.softRemove(User);
  }

  private async findUserById(id: number): Promise<User> {
    const options = this.getOneOptions(id);
    const User = await this.userRepository.findOne(options);
    if (!User) throw UserException.NOT_EXISTS;
    return User;
  }

  private getOneOptions(id: number): FindOneOptions<User> {
    return {
      where: { id },
    };
  }
}
