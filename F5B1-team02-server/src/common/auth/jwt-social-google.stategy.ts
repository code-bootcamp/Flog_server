import { Strategy, Profile } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
// import * as dotenv from 'dotenv';
// dotenv.config();


@Injectable()
export class JwtGoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile) {
    console.log(`accessToken: ${accessToken}`);
    console.log(`refreshToken: ${refreshToken}`);
    console.log(`profile: ${profile}`);

    console.log('===================구글 프로필=======================');
    console.log('구글 프로필: ', profile);
    return {
      email: profile.emails[0].value,
      nickName: profile.displayName,
      password: profile.id,
      phoneNumber: '01000000000',
    };
  }
}
