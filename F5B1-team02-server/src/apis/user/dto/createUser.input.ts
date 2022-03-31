import { Field, InputType } from '@nestjs/graphql';
import { MAINCATEGORY_ENUM } from 'src/apis/mainCategory/entities/mainCategory.entity';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  nickName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => MAINCATEGORY_ENUM)
  mainCategoryName?: MAINCATEGORY_ENUM;
}
