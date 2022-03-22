import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../schedule/entities/schedule.entity';
import { User } from '../user/entities/user.entity';
import { BudgetResolver } from './budget.resolver';
import { BudgetService } from './budget.service';
import { Budget } from './entities/budget.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Budget, User, Schedule])],
  providers: [BudgetResolver, BudgetService],
})
export class BudgetModule {}
