import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}
  async create(scheduleId, { ...createBoardInput }) {
    return await this.boardRepository.save({
      ...createBoardInput,
      schedule: scheduleId,
    });
  }
}
