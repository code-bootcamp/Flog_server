import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../schedule/entities/schedule.entity';

@Injectable()
export class ShareScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
  ) {}

  async findMyQt({ page }) {
    const myQts = await this.scheduleRepository
      .createQueryBuilder('schedule')
      .innerJoinAndSelect('schedule.user', 'user')
      //   .select('schedule')
      //   .from(Schedule, 'schedule')
      .where('schedule.isShare = :isShare', { isShare: '1' })
      .orderBy('schedule.createAt', 'DESC')
      .limit(12)
      .offset(12 * (page - 1))
      .getMany();

    return myQts;
  }
}
