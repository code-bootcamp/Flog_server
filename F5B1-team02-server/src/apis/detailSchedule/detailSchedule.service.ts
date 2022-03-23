import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DetailSchedule } from './entities/detailSchedule.entity';
// interface ICreate {
//   createDetailScheduleInput: CreateDetailScheduleInput;
//   scheduleId: string;
// }

interface IDelete {
  detailScheduleId: string;
}

@Injectable()
export class DetailScheduleService {
  constructor(
    @InjectRepository(DetailSchedule)
    private readonly detailScheduleRepository: Repository<DetailSchedule>,
  ) {}

  async findOne({ id }) {
    return await this.detailScheduleRepository.findOne({ id });
  }

  async create(scheduleId, { ...createDetailScheduleInput }) {
    return await this.detailScheduleRepository.save({
      schedule: scheduleId,
      ...createDetailScheduleInput,
    });
  }
  async update({ detailScheduleId, updateDetailScheduleInput }) {
    const detailIdInfo = await this.detailScheduleRepository.findOne({
      id: detailScheduleId,
    });

    const newDetailSchedule = {
      ...detailIdInfo,
      ...updateDetailScheduleInput,
    };
    return await this.detailScheduleRepository.save(newDetailSchedule);
  }

  async delete({ detailScheduleId }) {
    const detailIdInfo = await this.detailScheduleRepository.delete({
      id: detailScheduleId,
    });
    return detailIdInfo.affected ? true : false;
  }
}
