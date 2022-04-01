import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateDetailScheduleInput {
  @Field(() => String, { nullable: true })
  day?: string;

  @Field(() => String, { nullable: true })
  date?: string;

  @Field(() => String, { nullable: true })
  startTime?: string;

  @Field(() => String, { nullable: true })
  useTime?: string;

  @Field(() => String, { nullable: true })
  place?: string;

  @Field(() => String, { nullable: true })
  memo?: string;
}
