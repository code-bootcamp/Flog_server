import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../board/entities/board.entity';
import { DetailSchedule } from '../detailSchedule/entities/detailSchedule.entity';
import { Schedule } from '../schedule/entities/schedule.entity';

@Injectable()
export class ShareScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async findMyQt({ page }) {
    const myQts = await this.scheduleRepository
      .createQueryBuilder('schedule')
      .innerJoinAndSelect('schedule.user', 'user')
      .where('schedule.isShare = :isShare', { isShare: '1' })
      .orderBy('schedule.createAt', 'DESC')
      .limit(12)
      .offset(12 * (page - 1))
      .getMany();

    return myQts;
  }

  async findMyQt1({ scheduleId }) {
    const shareSchedule = await this.boardRepository
      .createQueryBuilder()
      .select('board')
      .addSelect('schedule')
      .from(Board, 'board')
      .innerJoin('board.schedule', 'schedule')
      .where('board.schedule = :scheduleId', {
        scheduleId: scheduleId,
      })
      .andWhere('schedule.isShare = :isShare', {
        isShare: '1',
      })
      .orderBy({
        'board.day': 'ASC',
      })
      .getMany();

    return shareSchedule;
  }
}
