import { Module } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../board/entities/board.entity';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { Schedule } from '../schedule/entities/schedule.entity';
import { ScheduleService } from '../schedule/schedule.service';
import { User } from '../user/entities/user.entity';
import { ShareScheduleResolver } from './sharedList.resolver';
import { ShareScheduleService } from './sharedList.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule, Board, MainCategory, User]),
    ElasticsearchModule.register({
      node: 'http://elasticsearch:9200',
    }),
  ],
  providers: [
    ScheduleService,
    ShareScheduleService, //
    ShareScheduleResolver,
  ],
})
export class ShareScheduleModule {}
