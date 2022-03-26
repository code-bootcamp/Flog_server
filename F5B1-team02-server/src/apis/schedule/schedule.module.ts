import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerImageResolver } from '../bannerImage/bannerImage.resolver';
import { BannerImageService } from '../bannerImage/bannerImage.service';
import { BannerImage } from '../bannerImage/entities/bannerImage.entity';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { User } from '../user/entities/user.entity';
import { Schedule } from './entities/schedule.entity';
import { ScheduleResolver } from './schedule.resolver';
import { ScheduleService } from './schedule.service';

@Module({
  imports: [TypeOrmModule.forFeature([Schedule, MainCategory, User])],
  providers: [
    ScheduleResolver, //
    ScheduleService,
  ],
})
export class ScheduleModule {}
