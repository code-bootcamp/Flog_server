import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailScheduleResolver } from './detailSchedule.resolver';
import { DetailScheduleService } from './detailSchedule.service';
import { DetailSchedule } from './entities/detailSchedule.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetailSchedule])],
  providers: [
    DetailScheduleResolver, //
    DetailScheduleService,
  ],
})
export class DetailScheduleModule {}
