import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PointHistory } from './entities/pointHistory.entity';
import { PointHistoryResolver } from './pointHistory.resolver';
import { PointHistoryService } from './pointHistory.service';

@Module({
  imports: [TypeOrmModule.forFeature([PointHistory])],
  providers: [PointHistoryResolver, PointHistoryService],
})
export class PointHisoryModule {}
