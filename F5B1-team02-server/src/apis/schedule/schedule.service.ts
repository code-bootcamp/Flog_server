import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { User } from '../user/entities/user.entity';
import { CreateScheduleInput } from './dto/createSchedule.input';
import { NUMBER_PEOPLE_ENUM, Schedule } from './entities/schedule.entity';

interface IFindOne {
  scheduleId: string;
}
interface ICreate {
  id: string;
  createScheduleInput: CreateScheduleInput;
}

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,
    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findMyQt({ currentUser, page }) {
    const myQts = await this.scheduleRepository
      .createQueryBuilder('schedule')
      .innerJoinAndSelect('schedule.user', 'user')
      .where('user.id = :userId', { userId: currentUser.id })
      .orderBy('schedule.createAt', 'DESC')
      .limit(12)
      .offset(12 * (page - 1))
      .getMany();

    return myQts;
  }

  async findOne({ scheduleId }: IFindOne) {
    return await this.scheduleRepository.findOne({
      where: { id: scheduleId },
    });
  }

  async create({ id, createScheduleInput }: ICreate) {
    const { mainCategoryId, ...schedule } = createScheduleInput;
    const result = await this.mainCategoryRepository.findOne({
      id: mainCategoryId,
    });
    const userId = await this.userRepository.findOne({
      id,
    });
    return await this.scheduleRepository.save({
      ...schedule,
      user: userId,
      mainCategory: result,
    });
  }

  async updateShare({ scheduleId }) {
    const result = await this.scheduleRepository.findOne({ id: scheduleId });
    const shareUpdate = { ...result, isShare: '1' };

    return await this.scheduleRepository.save(shareUpdate);
  }

  async updateUnshare({ scheduleId }) {
    const result = await this.scheduleRepository.findOne({ id: scheduleId });
    const unshareUpdate = { ...result, isShare: '0' };

    return await this.scheduleRepository.save(unshareUpdate);
  }
}
