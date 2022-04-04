import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoneyBook } from './entities/moneyBook.entity';
import { MoneyBookResolver } from './moneyBook.resolver';
import { MoneyBookService } from './moneyBook.service';

@Module({
  imports: [TypeOrmModule.forFeature([MoneyBook])],
  providers: [MoneyBookResolver, MoneyBookService],
})
export class MoneyBookModule {}
