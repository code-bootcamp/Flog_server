import { HttpStatus } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { UserService } from '../user.service';

class MockUserRepository {
  myDB = [
    {
      nickName: '둘리', //
      email: 'aa@aa',
      password: '1234',
      mainCategoryName: '마이페이지',
    },
  ];

  findOne({ email }) {
    const users = this.myDB.filter((el) => el.email === email);
    if (users.length) return users[1];
    return null;
  }

  save({ nickName, email, password, mainCategoryName }) {
    this.myDB.push({ nickName, email, password, mainCategoryName });
    return { nickName, email, password, mainCategoryName };
  }
}
class MockMainRepository {
  mainMyDB = [
    {
      id: '1',
      name: '마이페이지',
    },
  ];
  findOne({ name }) {
    const mains = this.mainMyDB.filter((el) => el.name === name);
    if (mains.length) return mains[0];
    return null;
  }
}

// type MockRepository<T> = Partial<Record<keyof Repository<T>, jest.Mock>>;
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

describe('UserService', () => {
  let userService: UserService;
  let userRepository: MockRepository<User>;
  let mainRepository: MockRepository<MainCategory>;

  const myData = {
    nickName: '둘리', //
    email: 'aa@aa',
    password: '1234',
    // mainCategoryName: MYPAGE,
  };

  beforeEach(async () => {
    const userModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useClass: MockUserRepository,
        },
        {
          provide: getRepositoryToken(MainCategory),
          useClass: MockMainRepository,
        },
      ],
    }).compile();

    userService = userModule.get<UserService>(UserService);
    userRepository = userModule.get<MockRepository<User>>(
      getRepositoryToken(User),
    );
    mainRepository = userModule.get<MockRepository<MainCategory>>(
      getRepositoryToken(MainCategory),
    );
  });

  describe('create', () => {
    it('이미 존재하는 이메일', async () => {
      const userRepositorySpyFindOne = jest.spyOn(userRepository, 'findOne');
      const userRepositorySpySave = jest.spyOn(userRepository, 'save');
      // const myData = {
      //   nickName: '둘리', //
      //   email: 'aa@aa',
      //   password: '1234',
      //   mainCategory: '1',
      // };
      try {
        const result = await userService.create(myData);
        expect(result).toStrictEqual(myData);
      } catch (error) {
        expect(error).toBeInstanceOf(HttpStatus.UNPROCESSABLE_ENTITY);
      }

      expect(userRepositorySpyFindOne).toBeCalledTimes(1);
      expect(userRepositorySpySave).toBeCalledTimes(0);
    });

    it('회원가입 성공', async () => {
      const userRepositorySpyFindOne = jest.spyOn(userRepository, 'findOne');
      const userRepositorySpySave = jest.spyOn(userRepository, 'save');

      // const myData = {
      //   nickName: '둘리', //
      //   email: '11@11',
      //   password: '1234',
      //   mainCategory: '1',
      // };

      const result = await userService.create(myData);
      expect(result).toStrictEqual(myData);
      expect(userRepositorySpyFindOne).toBeCalledTimes(1);
      expect(userRepositorySpySave).toBeCalledTimes(1);
    });
  });
});
