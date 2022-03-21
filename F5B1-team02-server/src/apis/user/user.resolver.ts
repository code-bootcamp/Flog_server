import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
// import { AuthGuard } from '@nestjs/passport';

@Resolver()
export class UserResolver {
  constructor(
    private readonly userService: UserService, //
  ) {}

  // 회원가입
  @Mutation(() => User)
  async createUser(
    @Args('createUserInput') createUserInput: CreateUserInput, //
  ) {
    const { email, password, ...user } = createUserInput;
    const hashedPassword = await bcrypt.hash(password, 10);
    const createUser = { password: hashedPassword, email, ...user };
    return await this.userService.create(createUser);
  }

  // 회원정보 조회
  @UseGuards(GqlAuthAccessGuard)
  async fetchUser(
    @CurrentUser() currentUser: ICurrentUser, //
  ) {
    console.log('==============');
    console.log(currentUser);
    console.log('==============');
    console.log('실행됐습니다~');

    const userEmail = currentUser.email;
    return await this.userService.findOne({ email: userEmail });
  }

  // 회원정보 수정
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => User)
  async updateUser(
    @CurrentUser() currentUser: ICurrentUser, //
    @Args('userEmail') userEmail: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return await this.userService.update({ userEmail, updateUserInput });
  }

  // 테스트
  @Query(() => String)
  fetchProducts() {
    return '테스트';
  }
}
