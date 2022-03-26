import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class updateBannerImageInput {
  // 배너이미지
  @Field(() => String, { defaultValue: true })
  url?: string;
}
