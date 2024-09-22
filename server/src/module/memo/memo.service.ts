import { Injectable } from '@nestjs/common';
import { CreateMemoDto } from './dto/create-memo.dto';
import { UpdateMemoDto } from './dto/update-memo.dto';

@Injectable()
export class MemoService {
  create(createMemoDto: CreateMemoDto) {
    return 'This action adds a new memo';
  }

  findAll() {
    return `This action returns all memo`;
  }

  findOne(id: number) {
    return `This action returns a #${id} memo`;
  }

  update(id: number, updateMemoDto: UpdateMemoDto) {
    return `This action updates a #${id} memo`;
  }

  remove(id: number) {
    return `This action removes a #${id} memo`;
  }
}
