import { Injectable } from '@nestjs/common';
import { CreateDoDto } from './dto/create-do.dto';
import { UpdateDoDto } from './dto/update-do.dto';

@Injectable()
export class DoService {
  create(createDoDto: CreateDoDto) {
    return 'This action adds a new do';
  }

  findAll() {
    return `This action returns all do`;
  }

  findOne(id: number) {
    return `This action returns a #${id} do`;
  }

  update(id: number, updateDoDto: UpdateDoDto) {
    return `This action updates a #${id} do`;
  }

  remove(id: number) {
    return `This action removes a #${id} do`;
  }
}
