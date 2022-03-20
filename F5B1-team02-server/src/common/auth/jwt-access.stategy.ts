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
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() { // private readonly cacheManager: Cache, // @Inject(CACHE_MANAGER)
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_KEY,
      passReqToCallback: true,
    });
  }

  // async validate(req, payload: any) {
  //   const accessToken = req.headers.authorization.split(' ')[1];
  //   const tokenCheck = await this.cacheManager.get(
  //     `accessToken: ${accessToken}`,
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
  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
