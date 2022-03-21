import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from './entities/budget.entity';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
  ) {}
  async create({ scheduleId, totalAmount, currentUser }) {
    const budgetCreate = this.budgetRepository.create({});
  }
  async checkUser({ currentUser }) {
    //로그인되어있는 상태인지 확인
  }
  async find({ scheduleId, currentUser }) {
    //만약 로그인된 사용자가 맞다면?
    if (currentUser)
      return await this.budgetRepository.find({ schedule: scheduleId });
  }
}
