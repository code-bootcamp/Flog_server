import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CurrentUser } from 'src/common/auth/gql-user.param';
import { Repository } from 'typeorm';
import { PointTransaction } from '../pointTranscation/entities/pointTransaction.entity';
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
      .where('user.id = :userId', { userId: currentUser.id })
      .orderBy('pointHistory.createdAt', 'DESC')
      .getMany();

    return history;
  }
}
