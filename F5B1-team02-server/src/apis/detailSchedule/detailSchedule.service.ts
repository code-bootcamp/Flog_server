import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDetailScheduleInput } from './dto/createDetailSchedule.input';
import { DetailSchedule } from './entities/detailSchedule.entity';
// interface ICreate {
//   createDetailScheduleInput: CreateDetailScheduleInput;
//   scheduleId: string;
// }
@Injectable()
export class DetailScheduleService {
  constructor(
    @InjectRepository(DetailSchedule)
    private readonly detailScheduleRepository: Repository<DetailSchedule>,
  ) {}

  async create(scheduleId, { ...createDetailScheduleInput }) {
    return await this.detailScheduleRepository.save({
      schedule: scheduleId,
      ...createDetailScheduleInput,
    });
  }
}
