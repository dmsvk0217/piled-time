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
import { User } from "src/module/user/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) {}

  async create(request: CategoryCreateRequest) {
    const category = this.categoryRepository.create({ ...request });
    const result = await this.categoryRepository.save(category);
    return plainToInstance(CategoryResponse, result);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories.map((category) => plainToInstance(CategoryResponse, category));
  }

  async findOne(id: number) {
    const result = await this.findcategoryById(id);
    return plainToInstance(CategoryResponse, result);
  }

  async update(id: number, request: CategoryUpdateRequest) {
    const category = await this.findcategoryById(id);
    this.categoryRepository.merge(category, request);
    return await this.categoryRepository.save(category);
  }

  async remove(id: number) {
    const category = await this.findcategoryById(id);
    await this.categoryRepository.softRemove(category);
  }

  private async findcategoryById(id: number) {
    const options = this.getOneOptions(id);
    const category = await this.categoryRepository.findOne(options);
    if (!category) throw CategoryException.NOT_EXISTS;
    return category;
  }

  private getOneOptions(id: number) {
    return {
      where: { id },
    };
  }
}
