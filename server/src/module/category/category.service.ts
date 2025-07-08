import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import {
  CategoryCreateRequest,
  CategoryResponse,
  CategoryUpdateRequest,
} from "src/module/category/dto";
import { Category } from "src/module/category/entities/category.entity";
import { CategoryException } from "src/module/category/errors/category.exception";
import { User } from "src/module/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(
    request: CategoryCreateRequest,
    user: User,
  ): Promise<CategoryResponse> {
    const category = this.categoryRepository.create({ ...request, user });
    const result = await this.categoryRepository.save(category);
    return plainToInstance(CategoryResponse, result);
  }

  async findAll(user: User): Promise<CategoryResponse[]> {
    const categories = await this.categoryRepository.find({
      where: { user: { id: user.id } },
    });
    return categories.map((category) =>
      plainToInstance(CategoryResponse, category),
    );
  }

  async findOne(id: number, user: User): Promise<CategoryResponse> {
    const result = await this.findById(id, user);
    return plainToInstance(CategoryResponse, result);
  }

  async update(
    id: number,
    request: CategoryUpdateRequest,
    user: User,
  ): Promise<CategoryResponse> {
    const category = await this.findById(id, user);
    this.categoryRepository.merge(category, request);
    const result = await this.categoryRepository.save(category);
    return plainToInstance(CategoryResponse, result);
  }

  async remove(id: number, user: User): Promise<void> {
    const category = await this.findById(id, user);
    await this.categoryRepository.softRemove(category);
  }

  async findById(id: number, user: User): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!category) throw CategoryException.NOT_EXISTS;
    return category;
  }
}
