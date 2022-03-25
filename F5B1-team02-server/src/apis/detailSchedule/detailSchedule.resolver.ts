import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { DetailScheduleService } from './detailSchedule.service';
import { CreateDetailScheduleInput } from './dto/createDetailSchedule.input';
import { UpdateDetailScheduleInput } from './dto/updateDetailSchedule.input';
import { DetailSchedule } from './entities/detailSchedule.entity';

@Resolver()
export class DetailScheduleResolver {
  constructor(
    private readonly detailScheduleService: DetailScheduleService, //
  ) {}

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [DetailSchedule])
  async fetchDetailSchedules(
    @CurrentUser() currentUser: ICurrentUser, //
    @Args('scheduleId') scheduleId: string,
    @Args('userId') userId: string,
  ) {
    return await this.detailScheduleService.findMyQts({
      currentUser,
      scheduleId,
      userId,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Query(() => [DetailSchedule])
  async fetchDetailSchedule(
    @CurrentUser() currentUser: ICurrentUser, //
    @Args('scheduleId') scheduleId: string,
    @Args('userId') userId: string,
    @Args('day') day: string,
  ) {
    return await this.detailScheduleService.findMyQtDay({
      currentUser,
      scheduleId,
      userId,
      day,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => DetailSchedule)
  async createDetailSchedule(
    @CurrentUser() currentUser: ICurrentUser, //
    @Args('createDetailScheduleInput')
    createDetailScheduleInput: CreateDetailScheduleInput,
    @Args('scheduleId') scheduleId: string,
  ) {
    return await this.detailScheduleService.create(scheduleId, {
      ...createDetailScheduleInput,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => DetailSchedule)
  async updateDetailSchedule(
    @CurrentUser() currentUser: ICurrentUser, //
    @Args('updateDetailScheduleInput')
    updateDetailScheduleInput: UpdateDetailScheduleInput,
    @Args('detailScheduleId') detailScheduleId: string,
  ) {
    return await this.detailScheduleService.update({
      detailScheduleId,
      updateDetailScheduleInput,
    });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteDetailSchedule(
    @Args('detailScheduleId') detailScheduleId: string,
  ) {
    return await this.detailScheduleService.delete({ detailScheduleId });
  }
}
