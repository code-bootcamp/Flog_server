import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  nickName: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;
}
