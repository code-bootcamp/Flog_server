import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDetailScheduleInput {
  @Field(() => String)
  startTime?: string;

  @Field(() => String)
  useTime?: string;

  @Field(() => String)
  place?: string;

  @Field(() => String, { nullable: true })
  memo?: string;
}
