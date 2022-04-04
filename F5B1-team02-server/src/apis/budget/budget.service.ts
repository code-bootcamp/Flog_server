import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { scheduled } from 'rxjs';
import { Connection, getRepository, Repository } from 'typeorm';
import { Schedule } from '../schedule/entities/schedule.entity';
import { User } from '../user/entities/user.entity';
import { Budget } from './entities/budget.entity';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private readonly budgetRepository: Repository<Budget>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Schedule)
    private readonly scheduleRepository: Repository<Schedule>,

    private readonly connection: Connection,
  ) {}
  async create({ scheduleId, totalAmount, currentUser }) {
    return await this.budgetRepository.save({
      totalAmount,
      schedule: scheduleId,
    });
  }

  async find({ scheduleId, currentUser }) {
    const budget = await this.budgetRepository.find({
      where: { schedule: scheduleId },
      relations: ['schedule'],
    });
    console.log(budget);
    return budget;
  }
  async update({ totalAmount, scheduleId }) {
    const id = await this.budgetRepository.findOne({ schedule: scheduleId });
    const newBudget = { ...id, totalAmount };
    return await this.budgetRepository.save(newBudget);
  }
}
