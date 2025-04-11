import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { plainToInstance } from "class-transformer";
import { MemoCreateRequest, MemoResponse, MemoUpdateRequest } from "src/module/memo/dto";
import { Memo } from "src/module/memo/entities/memo.entity";
import { MemoException } from "src/module/memo/errors/memo.exception";
import { User } from "src/module/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class MemoService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(Memo)
    private readonly MemoRepository: Repository<Memo>
  ) {}

  async create(request: MemoCreateRequest): Promise<MemoResponse> {
    const Memo = this.MemoRepository.create({ ...request });
    const result = await this.MemoRepository.save(Memo);
    return plainToInstance(MemoResponse, result);
  }

  async findAll(): Promise<MemoResponse[]> {
    const categories = await this.MemoRepository.find();
    return categories.map((Memo) => plainToInstance(MemoResponse, Memo));
  }

  async findOne(id: number): Promise<MemoResponse> {
    const result = await this.findMemoById(id);
    return plainToInstance(MemoResponse, result);
  }

  async update(id: number, request: MemoUpdateRequest): Promise<MemoResponse> {
    const Memo = await this.findMemoById(id);
    this.MemoRepository.merge(Memo, request);
    const result = await this.MemoRepository.save(Memo);
    return plainToInstance(MemoResponse, result);
  }

  async remove(id: number): Promise<void> {
    const Memo = await this.findMemoById(id);
    await this.MemoRepository.softRemove(Memo);
  }

  private async findMemoById(id: number): Promise<Memo> {
    const Memo = await this.MemoRepository.findOne({
      where: { id },
    });
    if (!Memo) throw MemoException.NOT_EXISTS;
    return Memo;
  }
}
