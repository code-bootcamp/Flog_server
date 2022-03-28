import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from 'src/app.controller';
import { AppService } from 'src/app.service';
import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';

describe('UserResolver', () => {
  let userResolver: UserResolver;

  beforeEach(async () => {});
  const appModule = await Test.createTestingModule({
    controllers: [AppController],
    providers: [UserService],
    // providers: [AppService],
  }).compile();

  userResolver = appModule.get(UserResolver);
  // userResolver = user.get<UserResolver>(UserResolver);

  describe('createUser', () => {
    it('회원가입', () => {
      const myData = {
        nickName: '둘리', //
        email: '11@11',
        password: '1234',
      };
      const result = userResolver.createUser({ ...myData });
      expect(result).toBe();
    });
  });
});
