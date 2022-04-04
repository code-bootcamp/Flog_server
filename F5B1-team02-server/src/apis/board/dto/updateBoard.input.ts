import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBoardInput {
  @Field(() => String)
  content?: string;
}
