import {
  CACHE_MANAGER,
  Inject,
  UnauthorizedException,
  UnprocessableEntityException,
  UseGuards,
} from '@nestjs/common';
import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Cache } from 'cache-manager';
import { AuthService } from './auth.service';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService, //
    @Inject(CACHE_MANAGER) //
    private readonly cacheManager: Cache,
  ) {}

  // 로그인
  @Mutation(() => String)
  async login(
    @Args('email') email: string, //
    @Args('password') password: string,
    @Context() context: any,
  ) {
    const user = await this.userService.findOne({ email });

    if (!user) {
      throw new UnprocessableEntityException('이메일이 없습니다');
    }
    const isAuthenticated = await bcrypt.compare(password, user.password);
    if (!isAuthenticated) {
      throw new UnauthorizedException('비밀번호가 틀렸습니다');
    }

    this.authService.setRefreshToken({ user, res: context.res });
    return this.authService.getAccessToken({ user });
  }

  // restoreAccessToken
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  restoreAccessToken(
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    return this.authService.getAccessToken({ user: currentUser });
  }

  // 로그아웃
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async logout(@Context() context: any): Promise<string> {
    const re_Token = context.req.headers.cookie.replace('refreshToken=', '');
    const ac_Token = context.req.headers.authorization.split(' ')[1];
    const time = Math.floor(Date.now() / 1000);
    try {
      jwt.verify(ac_Token, process.env.ACC_TOKEN, async (err, payload) => {
        const pay = payload.exp - time;
        await this.cacheManager.set(`accessToken:${ac_Token}`, ac_Token, {
          ttl: pay,
        });
      });
    } catch (err) {
      throw new UnauthorizedException();
    }

    try {
      jwt.verify(re_Token, process.env.REF_TOKEN, async (err, payload) => {
        const pay = payload.exp - time;
        await this.cacheManager.set(`refreshToken:${re_Token}`, re_Token, {
          ttl: pay,
        });
      });
    } catch (err) {
      throw new UnauthorizedException(err);
    }
    return '로그아웃에 성공했습니다.';
  }
}
