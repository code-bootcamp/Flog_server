import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from '../board/entities/board.entity';
import { Schedule } from '../schedule/entities/schedule.entity';
import { ShareScheduleResolver } from './sharedList.resolver';
import { ShareScheduleService } from './sharedList.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, Board])],
  providers: [
    ShareScheduleService, //
    ShareScheduleResolver,
  ],
})
export class ShareScheduleModule {}
