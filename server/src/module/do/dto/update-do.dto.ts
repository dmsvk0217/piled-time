import { PartialType } from '@nestjs/swagger';
import { CreateDoDto } from './create-do.dto';

export class UpdateDoDto extends PartialType(CreateDoDto) {}
