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

import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Cache } from 'cache-manager';


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

  //검증끝나고 수행되는 부분
  async validate(req, payload) {
    // if (
    //   await this.cacheManager.get(
    //     `refreshToken:${req.headers.cookie.replace('refreshToken=', '')}`,
    //   )
    // )
    //   throw new UnauthorizedException('이미 로그아웃된 사용자입니다');
    console.log(payload);


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
