import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MoneyBook } from './entities/moneyBook.entity';

@Injectable()
export class MoneyBookService {
  constructor(
    @InjectRepository(MoneyBook)
    private readonly moneyBookRepository: Repository<MoneyBook>,
  ) {}

  async create(amount, budgetId, currentUser, { ...createMoneyBookInput }) {
    const { tripdates, ...moneybook } = createMoneyBookInput;
    let result2 = '';
    let result3 = tripdates.split(',');
    console.log(result3);

    for (let i = 0; i < result3.length; i++) {
      const tripdate = result3[i] + ';';
      result2 += tripdate;
    }
    return await this.moneyBookRepository.save({
      amount,
      budget: budgetId,
      tripdates: result2,
      ...createMoneyBookInput,
      user: currentUser,
    });
  }
  async find(budgetId, date, currentUser) {
    const budget = await this.moneyBookRepository.find({
      where: { budget: budgetId, date: date },
      relations: ['budget'],
    });
    return budget;
  }
  async update({ moneyBookId, budgetId, updateMoneyBookInput }) {
    const moneybookid = await this.moneyBookRepository.findOne({
      id: moneyBookId,
    });
    const newMoneyBook = {
      ...moneybookid,
      budget: budgetId,
      ...updateMoneyBookInput,
    };
    return await this.moneyBookRepository.save(newMoneyBook);
  }
}
