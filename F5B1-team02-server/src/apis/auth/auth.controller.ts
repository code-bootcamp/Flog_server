import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';

interface IOAuthUser {
  user: Pick<User, 'nickName' | 'email' | 'phoneNumber' | 'password'>;
}

@Controller('/')
export class AuthController {
  constructor(
    private readonly userService: UserService, //
    private readonly authService: AuthService,
  ) {}

  // 구글 로그인
  @Get('/login/google')
  @UseGuards(AuthGuard('google'))
  async loginGoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    let user = await this.userService.findOne({ email: req.user.email });

    if (!user) {
      const createUser = req.user;
      user = await this.userService.create({ ...createUser });
    }

    this.authService.setRefreshToken({ user, res });

    res.redirect('https://flog.today');
  }
}
