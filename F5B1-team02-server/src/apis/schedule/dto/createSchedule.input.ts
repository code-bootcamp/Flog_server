import { Field, InputType } from '@nestjs/graphql';
import { HASHTAG, NUMBER_PEOPLE_ENUM } from '../entities/schedule.entity';

@InputType()
export class CreateScheduleInput {
  @Field(() => String)
  title: string;

  @Field(() => String)
  location: string;

  @Field(() => String)
  startDate: string;

  @Field(() => String)
  endDate: string;

  // 인원수
  @Field(() => NUMBER_PEOPLE_ENUM, { nullable: true })
  numberPeople: NUMBER_PEOPLE_ENUM;

  // 해시태그
  @Field(() => HASHTAG)
  hashtag: HASHTAG;

  @Field(() => String)
  mainCategoryId?: string;

  @Field(() => String)
  tripdates: string;
}
