import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from '../schedule/entities/schedule.entity';
import { BannerImageResolver } from './bannerImage.resolver';
import { BannerImageService } from './bannerImage.service';
import { BannerImage } from './entities/bannerImage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BannerImage, Schedule])],
  providers: [
    BannerImageResolver, //
    BannerImageService,
  ],
})
export class BannerImageModule {}
