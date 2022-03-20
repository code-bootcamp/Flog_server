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

// interface ICreate {
//   createUserInput: CreateUserInput;
// }
interface IUpdate {
  userEmail: string;
  updateUserInput: UpdateUserInput;
}

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findOne({ email }) {
    return await this.userRepository.findOne({ email });
  }

  async create(createUser: CreateUserInput) {
    const { email, ...user } = createUser;
    const isUserEmail = await this.userRepository.findOne({ email });

    if (isUserEmail) {
      throw new HttpException(
        '이미 등록된 이메일 입니다.',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    } else {
      return await this.userRepository.save({
        ...user,
        email: email,
      });
    }
  }

  async update({ userEmail, updateUserInput }: IUpdate) {
    const user = await this.userRepository.findOne({ email: userEmail });
    const newUser = {
      ...user,
      ...updateUserInput,
    };
    return await this.userRepository.save(newUser);
  }
}
