import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { PointHistory } from './entities/pointHistory.entity';
import { PointHistoryService } from './pointHistory.service';

@Resolver()
export class PointHistoryResolver {
  constructor(private readonly pointHistoryService: PointHistoryService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [PointHistory])
  async fetchPointHistory(@CurrentUser() currentUser: ICurrentUser) {
    return await this.pointHistoryService.find({ currentUser });
  }
}
