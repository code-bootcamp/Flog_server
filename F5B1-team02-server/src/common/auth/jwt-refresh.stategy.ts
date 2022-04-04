import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER) //
    private readonly cacheManager: Cache, //
  ) {
    super({
      jwtFromRequest: (req) => {
        const cookies = req.headers.cookie;

        return cookies.replace('refreshToken=', '');
      },
      secretOrKey: process.env.REFRESH_TOKEN_KEY,
      passReqToCallback: true,
    });
  }

  async validate(req, payload) {
    let re_Token = req.headers.cookie.replace('refreshToken=', '');
    if (await this.cacheManager.get(`refreshToken:${re_Token}`)) {
      throw new UnauthorizedException('이미 로그아웃된 사용자입니다');
    }

    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
