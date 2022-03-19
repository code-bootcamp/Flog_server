import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
// import { AuthGuard } from '@nestjs/passport';
// import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth-guard';
// import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  @Mutation(() => User)
  async createUser(
    @Args('email') email: string,
    @Args('nickname') nickname: string,
    @Args('password') password: string,
  ) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return await this.userService.create({ email, hashedPassword, nickname });
  }

  // // UseGuards 검증이 된것만 가능 = 반드시 로그인 필요
  // @UseGuards(GqlAuthAccessGuard) // 대체
  // @Query(() => String)
  // fetchUser(
  //   @CurrentUser() currentUser: ICurrentUser, //
  // ) {
  //   console.log('==============');
  //   console.log(currentUser);
  //   console.log('==============');
  //   console.log('실행됐습니다~');
  //   return '실행완료!!';
  // }
}
