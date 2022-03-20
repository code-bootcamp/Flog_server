import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';
require('dotenv').config();

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'refresh') {
  constructor() // @Inject(CACHE_MANAGER)
  // private readonly cacheManager: Cache,
  {
    super({
      jwtFromRequest: (req) => {
        const cookie = req.headers.cookie;
        if (cookie) {
          return cookie.replace('refreshToken=', '');
        }
      },
      secretOrKey: process.env.REFRESH_TOKEN_KEY,
      passReqToCallback: true,
    });
  }

  // async validate(req, payload: any) {
  //   const refreshToken = req.headers.cookie.split('=')[1];
  //   const tokenCheck = await this.cacheManager.get(
  //     `refreshToken: ${refreshToken}`,
  //   );

  //   if (tokenCheck) {
  //     throw new UnauthorizedException('이미 로그아웃이 되어 있습니다.');
  //   }
  //   return {
  //     id: payload.sub,
  //     email: payload.email,
  //     exp: payload.exp,
  //   };
  // }
  validate(payload) {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
