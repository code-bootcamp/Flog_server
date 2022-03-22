import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import {

  Injectable,
  UnauthorizedException,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
// import { Cache } from 'cache-manager';

@Injectable()
export class JwtAccessStrategy extends PassportStrategy(Strategy, 'access') {
  constructor() // private readonly cacheManager: Cache, // @Inject(CACHE_MANAGER) //
  {
    //검증로직, 실패시 밑으로 안가고 프론트로 넘어감
=======
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
=======
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
