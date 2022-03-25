import { Args, Query, Resolver } from '@nestjs/graphql';
import { Board } from '../board/entities/board.entity';
import { Schedule } from '../schedule/entities/schedule.entity';
import { ShareScheduleService } from './sharedList.service';

@Resolver()
export class ShareScheduleResolver {
  constructor(
    private readonly shareScheduleService: ShareScheduleService, //
  ) {}

  //족보 리스트 조회
  @Query(() => [Schedule])
  async fetchShareSchedules(
    @Args('page', { defaultValue: 1 }) page: number, //
  ) {
    return await this.shareScheduleService.findMyQt({ page });
  }

  // 족보 조회
  @Query(() => [Board])
  async fetchBoard(
    @Args('scheduleId') scheduleId: string, //
  ) {
    return await this.shareScheduleService.findMyQt1({ scheduleId });
  }
}
