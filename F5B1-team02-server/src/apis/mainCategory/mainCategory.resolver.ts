import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { type } from 'os';
import {
  MainCategory,
  MAINCATEGORY_ENUM,
} from './entities/mainCategory.entity';
import { MainCategoryService } from './mainCategory.service';

@Resolver()
export class MainCategoryResolver {
  constructor(private readonly mainCategoryService: MainCategoryService) {}

  @Query(() => [MainCategory])
  async fetchMainCategory() {
    return await this.mainCategoryService.find();
  }

  @Mutation(() => MainCategory)
  async createMainCategory(
    @Args({ name: 'name', type: () => MAINCATEGORY_ENUM })
    name: MAINCATEGORY_ENUM,
  ) {
    return await this.mainCategoryService.create({ name });
  }
}
