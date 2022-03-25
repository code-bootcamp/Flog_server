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

  async findOne({ id }) {
    return await this.boardRepository.findOne({ id });
  }

  async create(scheduleId, { ...createBoardInput }) {
    return await this.boardRepository.save({
      ...createBoardInput,
      schedule: scheduleId,
    });
  }

  async update(boardId, { ...updateBoardInput }) {
    const boardInfo = await this.boardRepository.findOne({ id: boardId });

    const newBoard = {
      ...boardInfo,
      ...updateBoardInput,
    };
    return await this.boardRepository.save(newBoard);
  }

  async delete({ scheduleId }) {
    const result = await this.boardRepository.delete({ schedule: scheduleId });
    return result.affected ? true : false;
  }

  async findMyQt({ scheduleId }) {
    const myQts = await this.boardRepository
      .createQueryBuilder()
      .select('board')
      .from(Board, 'board')
      .where('board.scheduleId = :scheduleId', {
        scheduleId: scheduleId,
      })
      .orderBy('board.day', 'ASC')
      .getMany();

    return myQts;
  }
}
