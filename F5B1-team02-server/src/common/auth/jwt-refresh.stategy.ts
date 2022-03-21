import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import { Cache } from 'cache-manager';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() {
    // private readonly cacheManager: Cache, // @Inject(CACHE_MANAGER) //
    super({
      jwtFromRequest: (req) => {
        const cookies = req.headers.cookies;
        return cookies.replace('refreshToken=', '');
      },
      secretOrKey: process.env.REFRESH_TOKEN_KEY,
      passReqToCallback: true,
    });
  }
  //검증끝나고 수행되는 부분
  async validate(req, payload) {
    // if (
    //   await this.cacheManager.get(
    //     `refreshToken:${req.headers.cookie.replace('refreshToken=', '')}`,
    //   )
    // )
    //   throw new UnauthorizedException('이미 로그아웃된 사용자입니다');
    console.log(payload);
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
