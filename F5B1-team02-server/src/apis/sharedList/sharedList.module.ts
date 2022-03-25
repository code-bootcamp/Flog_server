import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../schedule/entities/schedule.entity';
import { ShareScheduleResolver } from './sharedList.resolver';
import { ShareScheduleService } from './sharedList.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  providers: [
    ShareScheduleService, //
    ShareScheduleResolver,
  ],
})
export class ShareScheduleModule {}
