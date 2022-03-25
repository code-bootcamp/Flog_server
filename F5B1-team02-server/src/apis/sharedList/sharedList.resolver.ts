import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Schedule } from '../schedule/entities/schedule.entity';
import { ShareScheduleService } from './sharedList.service';
import { Cache } from 'cache-manager';

@Resolver()
export class ShareScheduleResolver {
  constructor(
    private readonly shareScheduleService: ShareScheduleService, //
    private readonly elasticsearchService: ElasticsearchService,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {}

  @Query(() => [Schedule])
  async fetchShareSchedules(
    @Args('page', { defaultValue: 1 }) page: number, //
  ) {
    return await this.shareScheduleService.findMyQt({ page });
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
