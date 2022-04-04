import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { Budget } from '../budget/entities/budget.entity';
import { CreateMoneyBookInput } from './dto/createMoneyBook.input';
import { UpdateMoneyBookInput } from './dto/updateMoneyBook.input';
import { MoneyBook } from './entities/moneyBook.entity';
import { MoneyBookService } from './moneyBook.service';

@Resolver()
export class MoneyBookResolver {
  constructor(private readonly moneyBookService: MoneyBookService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [MoneyBook])
  async fetchMoneyBook(
    @Args('date') date: string,
    @Args('budgetId') budgetId: string,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.moneyBookService.find(budgetId, date, currentUser);
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => MoneyBook)
  async createMoneyBook(
    @Args('createMoneyBookInput') createMoneyBookInput: CreateMoneyBookInput,
    @Args('budgetId') budgetId: string,
    @Args('amount') amount: number,
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    return await this.moneyBookService.create(amount, budgetId, currentUser, {
      ...createMoneyBookInput,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => MoneyBook)
  async updateMoneyBook(
    @Args('budgetId') budgetId: string,
    @Args('moneyBookId') moneyBookId: string,
    @Args('updateMoneyBookInput') updateMoneyBookInput: UpdateMoneyBookInput,
    @CurrentUser() currentUser: ICurrentUser,
  ) {
    return await this.moneyBookService.update({
      moneyBookId,
      budgetId,
      updateMoneyBookInput,
    });
  }
}
