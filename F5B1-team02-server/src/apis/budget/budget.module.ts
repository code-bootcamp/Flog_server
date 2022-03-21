import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BudgetResolver } from './budget.resolver';
import { BudgetService } from './budget.service';
import { Budget } from './entities/budget.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Budget])],
  providers: [BudgetResolver, BudgetService],
})
export class BudgetModule {}
