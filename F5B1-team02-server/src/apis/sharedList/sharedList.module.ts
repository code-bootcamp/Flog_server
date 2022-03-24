import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../schedule/entities/schedule.entity';
import { ShareScheduleResolver } from './sharedList.resolver';
import { ShareScheduleService } from './sharedList.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule])],
  providers: [
    ShareScheduleService, //
    ShareScheduleResolver,
  ],
})
export class ShareScheduleModule {}
