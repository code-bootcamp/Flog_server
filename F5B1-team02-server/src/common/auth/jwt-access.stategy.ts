import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {
  Injectable,
  UnauthorizedException,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { Cache } from 'cache-manager';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER) //
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_KEY,
      passReqToCallback: true,
    });
  }

  //검증끝나고 수행되는 부분
  async validate(req, payload) {
    if (
      await this.cacheManager.get(
        `accessToken:${req.headers.authorization.split(' ')[1]}`,
      )
    )
      throw new UnauthorizedException('로그아웃된 사용자입니다');

    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
