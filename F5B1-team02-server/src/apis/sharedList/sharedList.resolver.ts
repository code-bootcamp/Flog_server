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

  //족보 리스트 조회
  @Query(() => [Schedule])
  async fetchShareSchedules(
    @Args('page', { defaultValue: 1 }) page: number, //
  ) {
    return await this.shareScheduleService.findMyQtList({ page });
  }

  // 족보 조회
  @Query(() => [Board])
  async fetchBoard(
    @Args('scheduleId') scheduleId: string, //
  ) {
    return await this.shareScheduleService.findMyQtBoard({ scheduleId });
  }

  //지도 + 검색
  @Query(() => [Schedule])
  async scheduleSearch(
    @Args('search') search: string,
    @Args('where') where: string,
  ) {
    // const list = await this.cacheManager.get(`${search}`);
    // const map = await this.cacheManager.get(`${where}`);
    // if (list && map) {
    //   return list && map;
    // } else {
    await this.scheduleService.findLocation({ where });

    const result = await this.elasticsearchService.search({
      index: 'flog',
      query: {
        bool: {
          must: [
            { match: { title: search } }, //
            { match: { location: where } }, //
          ],
        },
      },
    });
    // console.log(result.hits.hits);
    const resultmap = result.hits.hits.map((el: any) => ({
      id: el._source.id,
      title: el._source.title,
      location: el._source.location,
    }));
    console.log('resultmap', resultmap);
    if (resultmap.length === 0)
      throw new UnprocessableEntityException('해당 내용이 존재하지 않습니다.');
    // await this.cacheManager.set(`${search}`, resultmap, { ttl: 0 });
    // await this.cacheManager.set(`${where}`, resultmap, { ttl: 0 });
    // console.log(map);
    // if (map && resultmap) return resultmap;
    return resultmap;
    // }
  }
  //지도 + 해시태그
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
