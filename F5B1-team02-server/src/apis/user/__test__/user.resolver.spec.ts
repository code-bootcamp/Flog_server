import { Test, TestingModule } from '@nestjs/testing';
// import { AppController } from 'src/app.controller';
import { UserResolver } from '../user.resolver';
import { UserService } from '../user.service';

describe('UserResolver', () => {
  let userResolver: UserResolver;

  beforeEach(async () => {
    const appModule: TestingModule = await Test.createTestingModule({
      // controllers: [AppController],
      providers: [UserService],
    }).compile();
    userResolver = appModule.get(UserResolver);
  });

  describe('createUser', () => {
    it('회원가입', async () => {
      const userData = {
        nickName: '둘리', //
        email: '11@11',
        password: '1234',
        mainCategoryId: '1',
      };
      const result = await userResolver.createUser({ ...userData });
      expect(result);
    });
  });
});
