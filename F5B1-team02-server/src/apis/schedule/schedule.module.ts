import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerImageResolver } from '../bannerImage/bannerImage.resolver';
import { BannerImageService } from '../bannerImage/bannerImage.service';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { User } from '../user/entities/user.entity';
import { Schedule } from './entities/schedule.entity';
import { ScheduleResolver } from './schedule.resolver';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, MainCategory, User]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  providers: [
    ScheduleResolver, //
    ScheduleService,
  ],
})
export class ScheduleModule {}
