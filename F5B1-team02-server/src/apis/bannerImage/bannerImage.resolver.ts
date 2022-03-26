import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { BannerImageService } from './bannerImage.service';
import { BannerImage } from './entities/bannerImage.entity';

@Resolver()
export class BannerImageResolver {
  constructor(private readonly bannerImageService: BannerImageService) {}

  // @UseGuards(GqlAuthAccessGuard)
  // @Mutation(() => BannerImage)
  // async uploadBannerImage(
  //   @Args('scheduleId') scheduleId: string,
  //   @Args({ name: 'imageURL', type: () => String }) imageURL: string,
  // ) {
  //   return await this.bannerImageService.create({ scheduleId, imageURL });
  // }
  @Mutation(() => String)
  async uploadBannerImage(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return await this.bannerImageService.upload({ file });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => BannerImage)
  async updateBannerImage(
    @Args('scheduleId') scheduleId: string,
    @Args({ name: 'url', type: () => String }) url: string,
  ) {
    // return await this.bannerImageService.update({ scheduleId, url });
    return '11';
  }
}
