import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class UpdateBannerImageInput {
  @Field(() => String)
  url: string;

  @Field(() => Boolean, { defaultValue: true })
  isImage: boolean;
}
