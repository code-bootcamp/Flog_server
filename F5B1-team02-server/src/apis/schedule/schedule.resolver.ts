import { UseGuards } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { query } from 'express';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { CreateScheduleInput } from './dto/createSchedule.input';
import { Schedule } from './entities/schedule.entity';
import { ScheduleService } from './schedule.service';

@Resolver()
export class ScheduleResolver {
  constructor(
    private readonly scheduleService: ScheduleService, //
    private readonly elasticSearchService: ElasticsearchService,
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [Schedule])
  async fetchSchedules(
    @CurrentUser() currentUser: ICurrentUser, //
    @Args('page', { defaultValue: 1 }) page: number,
  ) {
    return await this.scheduleService.findMyQt({ currentUser, page });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => Schedule)
  async fetchSchedule(@Args('scheduleId') scheduleId: string) {
    return await this.scheduleService.findOne({ scheduleId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Schedule)
  async createSchedule(
    @CurrentUser() currentUser: ICurrentUser, //
    @Args('createScheduleInput') createScheduleInput: CreateScheduleInput,
  ) {
    const { id, ...user } = currentUser;

    return await this.scheduleService.create({
      id,
      createScheduleInput,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Schedule)
  async share(
    @Args('scheduleId') scheduleId: string, //
  ) {
    return await this.scheduleService.updateShare({ scheduleId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Schedule)
  async unshare(
    @Args('scheduleId') scheduleId: string, //
  ) {
    return await this.scheduleService.updateUnshare({ scheduleId });
  }
}
