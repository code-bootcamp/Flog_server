import { Args, Query, Resolver } from '@nestjs/graphql';
import { Schedule } from '../schedule/entities/schedule.entity';
import { ShareScheduleService } from './sharedList.service';

@Resolver()
export class ShareScheduleResolver {
  constructor(
    private readonly shareScheduleService: ShareScheduleService, //
  ) {}

  @Query(() => [Schedule])
  async fetchShareSchedules(
    @Args('page', { defaultValue: 1 }) page: number, //
  ) {
    return await this.shareScheduleService.findMyQt({ page });
  }

  @Query(() => Schedule)
  async fetchShareSchedule(
    @Args('scheduleId') scheduleId: string, //
  ) {
    return await this.shareScheduleService.findMyQt1({ scheduleId });
  }
}
