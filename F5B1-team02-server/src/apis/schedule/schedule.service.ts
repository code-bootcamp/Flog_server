import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { User } from '../user/entities/user.entity';
import { CreateScheduleInput } from './dto/createSchedule.input';
import { HASHTAG, Schedule } from './entities/schedule.entity';

interface IFindOne {
  scheduleId: string;
}
interface ICreate {
  id: string;
  createScheduleInput: CreateScheduleInput;
}
interface IFindHashtagLocation {
  where: string;
  hashTag: HASHTAG;
}

interface IFindLocation {
  where: string;
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
      relations: ['user'],
    });
  }

  async findHashtagLocation({ hashTag, where }: IFindHashtagLocation) {
    const find = await this.scheduleRepository
      .createQueryBuilder()
      .where({ isShare: '1' })
      .andWhere({ location: where, hashtag: hashTag })
      .getMany();
    return find;
  }
  async findLocation({ where }: IFindLocation) {
    return await this.scheduleRepository.findOne({
      where: { location: where },
    });
  }

  async create({ id, createScheduleInput }: ICreate) {
    const { mainCategoryName, tripdates, ...schedule } = createScheduleInput;
    const result = await this.mainCategoryRepository.findOne({
      name: mainCategoryName,
    });
    const userId = await this.userRepository.findOne({
      id,
    });
    let result2 = '';
    let result3 = tripdates.split(',');
    console.log(result3);

    for (let i = 0; i < result3.length; i++) {
      const tripdate = result3[i] + ';';
      result2 += tripdate;
    }

    result2 = result2.slice(0, result2.length - 1);

    return await this.scheduleRepository.save({
      ...schedule,
      user: userId,
      mainCategory: result,
      tripdates: result2,
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
