import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtAccessStrategy } from 'src/common/auth/jwt-access.stategy';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { User } from './entities/user.entity';
import { UserResolver } from './user.resolver';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, MainCategory])],
  providers: [
    JwtAccessStrategy,
    UserResolver, //
    UserService,
  ],
})
export class UserModule {}
