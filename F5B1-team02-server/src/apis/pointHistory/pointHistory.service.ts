import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'src/common/auth/gql-user.param';
import { Repository } from 'typeorm';
import { PointHistory } from './entities/pointHistory.entity';

@Injectable()
export class PointHistoryService {
  constructor(
    @InjectRepository(PointHistory)
    private readonly pointHistoryRepository: Repository<PointHistory>,
  ) {}
  async find({ currentUser }) {
    const history = await this.pointHistoryRepository
      .createQueryBuilder('pointHistory')
      .innerJoinAndSelect('pointHistory.user', 'user')
      .leftJoinAndSelect('pointHistory.pointId', 'pointId')
      .where('user.id = :userId', { userId: currentUser.id })
      .orderBy('pointHistory.createdAt')
      .getMany();
    return history;
    // return await this.pointHistoryRepository.find({
    //   user: currentUser.id,
    //   // createdAt: createAt,
    // })
  }
}
