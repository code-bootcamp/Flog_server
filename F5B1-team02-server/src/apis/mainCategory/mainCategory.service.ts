import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MainCategory } from './entities/mainCategory.entity';

@Injectable()
export class MainCategoryService {
  @InjectRepository(MainCategory)
  private readonly mainCategoeyRepository: Repository<MainCategory>;
  async find() {
    return await this.mainCategoeyRepository.find({});
  }
}
