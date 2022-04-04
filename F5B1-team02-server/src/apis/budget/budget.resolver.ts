import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { BudgetService } from './budget.service';
import { Budget } from './entities/budget.entity';

@Resolver()
export class BudgetResolver {
  constructor(
    private readonly budgetService: BudgetService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Budget])
  async fetchBudget(
    @Args('scheduleId') scheduleId: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.budgetService.find({ scheduleId, currentUser });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Budget)
  async createBudget(
    @Args('totalAmount') totalAmount: number,
    @Args('scheduleId') scheduleId: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.budgetService.create({
      scheduleId,
      totalAmount,
      currentUser,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Budget)
  async updateBudget(
    @Args('totalAmount') totalAmount: number,
    @Args('scheduleId') scheduleId: string,
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    return await this.budgetService.update({
      totalAmount,
      scheduleId,
    });
  }
}
