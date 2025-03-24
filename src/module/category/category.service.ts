import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CategoryCreateRequest, CategoryUpdateRequest } from "src/module/category/dto";
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
    return await this.categoryRepository.save(category);
  }

  async findAll() {
    return await this.categoryRepository.find();
  }

  async findOne(id: number) {
    return await this.findcategoryById(id);
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
