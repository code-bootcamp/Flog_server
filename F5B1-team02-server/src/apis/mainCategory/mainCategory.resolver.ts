import { Query, Resolver } from '@nestjs/graphql';
import { MainCategory } from './entities/mainCategory.entity';
import { MainCategoryService } from './mainCategory.service';

@Resolver()
export class MainCategoryResolver {
  constructor(private readonly mainCategoryService: MainCategoryService) {}

  @Query(() => [MainCategory])
  async fetchMainCategory() {
    return await this.mainCategoryService.find();
  }
}
