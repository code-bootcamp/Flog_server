import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // findOne
  async findOne({ email }) {
    return await this.userRepository.findOne({ email });
  }

  // create
  async create({ email, hashedPassword: password, nickname }) {
    const user = await this.userRepository.findOne({ email });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다.');

    //const password = hashedPassword;
    return await this.userRepository.save({ email, password, nickname });
  }
}
