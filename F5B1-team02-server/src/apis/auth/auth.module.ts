import { Module } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { JwtRefreshStrategy } from 'src/common/auth/jwt-refresh.stategy';
import { JwtGoogleStrategy } from 'src/common/auth/jwt-social-google.stategy';
import { AuthController } from './auth.controller';

import { JwtAccessStrategy } from 'src/common/auth/jwt-access.stategy';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';

@Module({
  imports: [
    JwtModule.register({}), //
    TypeOrmModule.forFeature([User, MainCategory]),
  ],
  providers: [
    AuthResolver,
    AuthService,
    UserService,
    JwtRefreshStrategy,
    JwtGoogleStrategy,
    JwtAccessStrategy,
  ],
  controllers: [
    AuthController, //
  ],
})
export class AuthModule {}
