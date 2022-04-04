import {
  CACHE_MANAGER,
  HttpException,
  Inject,
  UnprocessableEntityException,
} from '@nestjs/common';

import { Args, Query, Resolver } from '@nestjs/graphql';
import { Board } from '../board/entities/board.entity';
import { HASHTAG, Schedule } from '../schedule/entities/schedule.entity';
import { ShareScheduleService } from './sharedList.service';
import { Cache } from 'cache-manager';
import { ScheduleService } from '../schedule/schedule.service';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Resolver()
export class ShareScheduleResolver {
  constructor(
    private readonly shareScheduleService: ShareScheduleService, //
    private readonly scheduleService: ScheduleService,
    private readonly elasticsearchService: ElasticsearchService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Schedule])
  async fetchShareSchedules(
    @Args('page', { defaultValue: 1 }) page: number, //
  ) {
    return await this.shareScheduleService.findMyQtList({ page });
  }

  @Query(() => [Board])
  async fetchShareBoard(
    @Args('scheduleId') scheduleId: string, //
  ) {
    return await this.shareScheduleService.findMyQtBoard({ scheduleId });
  }

  @Query(() => [Schedule])
  async scheduleSearch(
    @Args('search') search: string,
    @Args('where') where: string,
  ) {
    const result = await this.elasticsearchService.search({
      index: 'flog001',
      from: 0,
      size: 100,
      query: {
        bool: {
          must: [
            { prefix: { title: search } }, //
            { match: { location: where } }, //
          ],
        },
      },
    });
    const resultmap = result.hits.hits.map((el: any) => ({
      id: el._source.id,
      title: el._source.title,
      location: el._source.location,
      startDate: el._source.startdate,
      endDate: el._source.enddate,
    }));
    console.log('resultmap', resultmap);
    if (resultmap.length === 0)
      throw new UnprocessableEntityException('해당 내용이 존재하지 않습니다.');
    await this.cacheManager.set(`${search}`, resultmap, { ttl: 0 });

    return resultmap;
  }

  @Query(() => [Schedule])
  async scheduleHashTagSearch(
    @Args('where') where: string,
    @Args('hashTag') hashTag: HASHTAG,
  ) {
    return await this.scheduleService.findHashtagLocation({
      where,
      hashTag,
    });
  }
}
