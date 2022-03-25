import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateBoardInput {
  @Field(() => String)
  day!: string;

  @Field(() => String)
  content!: string;
}
