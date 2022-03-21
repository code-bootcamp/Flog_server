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
    // console.log(currentUser.id);
    return await this.pointHistoryRepository.find({
      where: { user: currentUser.id },
    });
  }
}
