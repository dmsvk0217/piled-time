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
    @InjectRepository(Memo)
    private readonly memoRepository: Repository<Memo>
  ) {}

  async create(request: MemoCreateRequest, user: User): Promise<MemoResponse> {
    const memo = this.memoRepository.create({ ...request, user });
    const result = await this.memoRepository.save(memo);
    return plainToInstance(MemoResponse, result);
  }

  async findAll(user: User): Promise<MemoResponse[]> {
    const memos = await this.memoRepository.find({
      where: { user: { id: user.id } },
    });
    return memos.map((Memo) => plainToInstance(MemoResponse, Memo));
  }

  async findOne(id: number, user: User): Promise<MemoResponse> {
    const result = await this.findById(id, user);
    return plainToInstance(MemoResponse, result);
  }

  async update(id: number, request: MemoUpdateRequest, user: User): Promise<MemoResponse> {
    const memo = await this.findById(id, user);
    this.memoRepository.merge(memo, request);
    const result = await this.memoRepository.save(memo);
    return plainToInstance(MemoResponse, result);
  }

  async remove(id: number, user: User): Promise<void> {
    const memo = await this.findById(id, user);
    await this.memoRepository.softRemove(memo);
  }

  private async findById(id: number, user: User): Promise<Memo> {
    const memo = await this.memoRepository.findOne({
      where: { id, user: { id: user.id } },
    });
    if (!memo) throw MemoException.NOT_EXISTS;
    return memo;
  }
}
