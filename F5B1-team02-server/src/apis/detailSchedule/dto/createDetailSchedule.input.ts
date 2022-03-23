import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDetailScheduleInput {
  @Field(() => String)
  day!: string;

  @Field(() => String)
  date!: string;

  @Field(() => String)
  startTime!: string;

  @Field(() => String)
  useTime!: string;

  @Field(() => String)
  place!: string;

  @Field(() => String, { nullable: true })
  memo?: string;
}
