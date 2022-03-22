import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/createUser.input';
import { UpdateUserInput } from './dto/updateUser.input';
import * as bcrypt from 'bcrypt';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';

// interface ICreate {
//   createUserInput: CreateUserInput;
// }
// interface IUpdate {
//   email: string;
//   updateUserInput: UpdateUserInput;
//   hashedPassword: string;
// }

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(MainCategory)
    private readonly mainCategoryRepository: Repository<MainCategory>,
  ) {}

  async findOne({ email }) {
    return await this.userRepository.findOne({ email });
  }

  async create(createUser: CreateUserInput) {
    const { email, mainCategoryId, ...user } = createUser;
    const isUserEmail = await this.userRepository.findOne({ email });
    const result = await this.mainCategoryRepository.findOne({
      id: mainCategoryId,
    });

    if (isUserEmail) {
      throw new HttpException(
        '이미 등록된 이메일 입니다.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      return await this.userRepository.save({
        ...user,
        email: email,
        mainCategory: result,
      });
    }
  }

  async update({ email, hashedPassword: password, updateUserInput }) {
    const user = await this.userRepository.findOne({ email });
    const newUser = { ...user, ...updateUserInput, password }; // 순서
    console.log(newUser);
    return await this.userRepository.save(newUser);
  }
}
