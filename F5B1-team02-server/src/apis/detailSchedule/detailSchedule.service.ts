import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../schedule/entities/schedule.entity';
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

  async findMyQts({ scheduleId }) {
    const myQts = await this.detailScheduleRepository

      .createQueryBuilder('detail_schedule')
      .innerJoinAndSelect('detail_schedule.schedule', 'schedule')
      .where('detail_schedule.scheduleId = :scheduleId', {
        scheduleId: scheduleId,
      })
      .orderBy({
        'detail_schedule.date': 'ASC',
        'detail_schedule.startTime': 'ASC',
      })
      .getMany();

    return myQts;
  }

  async findMyQtDay({ scheduleId, day }) {
    const myQts = await this.detailScheduleRepository
      .createQueryBuilder('detail_schedule')
      .innerJoinAndSelect('detail_schedule.schedule', 'schedule')
      .where('detail_schedule.scheduleId = :scheduleId', {
        scheduleId: scheduleId,
      })
      .andWhere('detail_schedule.day = :day', {
        day: day,
      })
      .orderBy({
        'detail_schedule.startTime': 'ASC',
      })
      .getMany();

    return myQts;
  }

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
    const result = await this.detailScheduleRepository.delete({
      id: detailScheduleId,
    });
    return result.affected ? true : false;
  }
}
