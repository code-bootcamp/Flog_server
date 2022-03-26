import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { FileUpload, GraphQLUpload } from 'graphql-upload';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { BannerImageService } from './bannerImage.service';
import { Schedule } from '../schedule/entities/schedule.entity';
import { scheduled } from 'rxjs';
import { UpdateBannerImageInput } from './dto/updateBannerImage.Input';

@Resolver()
export class BannerImageResolver {
  constructor(private readonly bannerImageService: BannerImageService) {}

  // 구글 스토리지 파일 업로드
  @Mutation(() => String)
  async uploadBannerImagefile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return await this.bannerImageService.upload({ file });
  }
}
