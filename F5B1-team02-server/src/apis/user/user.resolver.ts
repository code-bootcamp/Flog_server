import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import * as bcrypt from 'bcrypt';
import { UseGuards } from '@nestjs/common';
import { CurrentUser, ICurrentUser } from 'src/common/auth/gql-user.param';
import { GqlAuthAccessGuard } from 'src/common/auth/gql-auth.guard';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

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
  @Query(() => User)
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
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    const { email, ...user } = currentUser;

    const { password, ...update } = updateUserInput;
    const hashedPassword = await bcrypt.hash(password, 10);

    return await this.userService.update({
      email,
      hashedPassword,
      updateUserInput,
    });
  }

  // 회원탈퇴
  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => Boolean)
  async deleteUser(@Args('userEmail') userEmail: string) {
    return await this.userService.delete({ userEmail });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async uploadProfileImagefile(
    @Args({ name: 'file', type: () => GraphQLUpload }) file: FileUpload,
  ) {
    return await this.userService.upload({ file });
  }

  @UseGuards(GqlAuthAccessGuard)
  @Mutation(() => String)
  async deleteProfileImagefile(
    @Args('userId') userId: string, //
  ) {
    return await this.userService.deleteImageFile({ userId });
  }
}
