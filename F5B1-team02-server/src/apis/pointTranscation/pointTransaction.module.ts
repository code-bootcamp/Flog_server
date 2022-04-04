import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IamportService } from '../iamport/iamport.service';
import { PointHistory } from '../pointHistory/entities/pointHistory.entity';
// import { SharedList } from '../sharedList/entities/sharedList.entity';
import { User } from '../user/entities/user.entity';
import { PointTransaction } from './entities/pointTransaction.entity';
import { PointTransactionResolver } from './pointTransaction.resolver';
import { PointTransactionService } from './pointTransaction.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PointTransaction,
      User,
      PointHistory,
    ]),
  ],
  providers: [
    PointTransactionResolver,
    PointTransactionService,
    IamportService,
  ],
})
export class PointTransactionModule {}
