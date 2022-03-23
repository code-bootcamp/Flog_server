import { Field, InputType, Int } from '@nestjs/graphql';
import { SPENDING_CATEGORY_STATUS_ENUM } from '../entities/moneyBook.entity';

@InputType()
export class CreateMoneyBookInput {
  @Field(() => String)
  date!: string;

  @Field(() => SPENDING_CATEGORY_STATUS_ENUM)
  status!: SPENDING_CATEGORY_STATUS_ENUM;

  @Field(() => String)
  time!: string;

  @Field(() => String)
  context!: string;

  @Field(() => String)
  memo?: string;
}
