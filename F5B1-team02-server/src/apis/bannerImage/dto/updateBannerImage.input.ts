import { Field, InputType } from '@nestjs/graphql';
import { HASHTAG, NUMBER_PEOPLE_ENUM } from '../entities/schedule.entity';

@InputType()
export class updateBannerImageInput {
  // 배너이미지
  @Field(() => String, { defaultValue: true })
  url?: string;
}
