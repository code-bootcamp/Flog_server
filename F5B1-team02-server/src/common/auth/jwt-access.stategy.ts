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
  constructor() // @Inject(CACHE_MANAGER) //
  // private readonly cacheManager: Cache,
  {
    //검증로직, 실패시 밑으로 안가고 프론트로 넘어감
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_KEY,
      passReqToCallback: true,
    });
  }

  //검증끝나고 수행되는 부분
  async validate(req, payload) {
    // if (
    //   await this.cacheManager.get(
    //     `accessToken:${req.headers.authorization.split(' ')[1]}`,
    //   )
    // )
    //   throw new UnauthorizedException('로그아웃된 사용자입니다');

    return {
      //fetchuser로 들어가게됨
      id: payload.sub,
      email: payload.email,
    }; //유저라는곳 안에 들어감 -> gql-user.param.ts
  }
}
