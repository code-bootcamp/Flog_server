import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { BannerImageService } from './bannerImage.service';
import { Schedule } from '../schedule/entities/schedule.entity';
import { scheduled } from 'rxjs';
import { updateBannerImageInput } from './dto/updateBannerImage.Input';

@Resolver()
export class BannerImageResolver {
  constructor(private readonly bannerImageService: BannerImageService) {}

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async uploadBannerImagefile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return await this.bannerImageService.upload({ file });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async deleteBannerImagefile(
    @Args('scheduleId') scheduleId: string, //
  ) {
    return await this.bannerImageService.deleteImageFile({ scheduleId });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Schedule)
  async updateBannerImage(
    @Args('scheduleId') scheduleId: string,
    @Args('updateBannerImageInput')
    updateBannerImageInput: updateBannerImageInput,
  ) {
    return await this.bannerImageService.update({
      scheduleId,
      updateBannerImageInput,
    });
  }
}
