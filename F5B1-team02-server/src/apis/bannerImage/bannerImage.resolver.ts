import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { BannerImageService } from './bannerImage.service';

@Resolver()
export class BannerImageResolver {
  constructor(
    private readonly bannerImageService: BannerImageService, //
  ) {}

  // @Query(() => [Image])
  // async fetchImages(
  //   @Args('roomId') roomId: string, //
  // ) {
  //   return await this.bannerImageService.findAll({ roomId });
  // }

  // @Mutation(() => [String])
  // async uploadImages(
  //   @Args({ name: 'files', type: () => [GraphQLUpload] }) files: FileUpload[], //
  // ) {
  //   return await this.bannerImageService.uploads({ files });
  // }
}
