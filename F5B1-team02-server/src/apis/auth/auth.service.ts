import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService, //
  ) {}

  setRefreshToken({ user, res }) {
    const refreshToken = this.jwtService.sign(
      { email: user.email, sub: user.id },
      { secret: process.env.REFRESH_TOKEN_KEY, expiresIn: '2w' },
    );


    // 배포환경
    // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.setHeader('Access-Control-Allow-Origin', 'https://flog.today');
    // res.setHeader(
    //   'Set-Cookie',
    //   `refreshToken=${refreshToken} //path=/; domain=.gyeoriii.com; SameSite=None; Secure; httpOnly;; `,
    // );
  }

  getAccessToken({ user }) {
    return this.jwtService.sign(
      { email: user.email, sub: user.id }, //
      { secret: process.env.ACCESS_TOKEN_KEY, expiresIn: '1h' },
    );
  }
}
