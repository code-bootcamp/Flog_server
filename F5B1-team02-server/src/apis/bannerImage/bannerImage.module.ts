import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BannerImageResolver } from './bannerImage.resolver';
import { BannerImageService } from './bannerImage.service';
import { BannerImage } from './entities/bannerImage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BannerImage])],
  providers: [
    BannerImageResolver, //
    BannerImageService,
  ],
})
export class BannerImageModule {}
