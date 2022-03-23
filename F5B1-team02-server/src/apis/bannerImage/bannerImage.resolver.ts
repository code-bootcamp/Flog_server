import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { BannerImageService } from './bannerImage.service';

@Resolver()
export class BannerImageResolver {
  constructor(private readonly bannerImageService: BannerImageService) {}

  @Mutation(() => String)
  async uploadBannerImage(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return await this.bannerImageService.upload({ file });
  }
}
