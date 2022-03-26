import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Board } from '../board/entities/board.entity';
import { Schedule } from '../schedule/entities/schedule.entity';
import { ShareScheduleService } from './sharedList.service';
import { Cache } from 'cache-manager';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Resolver()
export class ShareScheduleResolver {
  constructor(
    private readonly shareScheduleService: ShareScheduleService, //
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

  @Query(() => [Schedule])
  async fetchSearch(@Args('search') search: string) {
    const list = await this.cacheManager.get(`${search}`);
    if (list) {
      return list;
    } else {
      const result = await this.elasticsearchService.search({
        query: { bool: { should: [{ prefix: { name: search } }] } },
      });
      const resultmap = result.hits.hits.map((el: any) => ({
        id: el._source.id,
        name: el._source.name,
        price: el._source.price,
      }));
      await this.cacheManager.set(`${search}`, resultmap, { ttl: 0 });
      return resultmap;
    }
  }
}
