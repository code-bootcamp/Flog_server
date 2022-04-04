import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserInput } from './dto/createUser.input';
import { MainCategory } from '../mainCategory/entities/mainCategory.entity';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import { getToday } from 'src/libraries/utils';

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
    const { email, mainCategoryName, ...user } = createUser;
    const isUserEmail = await this.userRepository.findOne({ email });
    const result = await this.mainCategoryRepository.findOne({
      name: mainCategoryName,
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

  async delete({ userEmail }) {
    const userInfo = await this.userRepository.findOne({ email: userEmail });
    const spliturl = userInfo.url.split(`${process.env.STORAGE_BUCKET}/`);
    const fileName = spliturl[spliturl.length - 1];
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILENAME,
      projectId: process.env.STORAGE_PROJECT_ID,
    });

    const result = await storage
      .bucket(process.env.STORAGE_BUCKET)
      .file(fileName)
      .delete();

    await this.userRepository.delete({ email: userEmail });

    return result ? true : false;
  }

  async upload({ file }) {
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILENAME,
      projectId: process.env.STORAGE_PROJECT_ID,
    }).bucket(process.env.STORAGE_BUCKET);

    const fname = `profile/${getToday()}/${uuidv4()}/${file.filename}`;
    const imageUrl = await new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(storage.file(fname).createWriteStream())
        .on('finish', () => resolve(`${process.env.STORAGE_BUCKET}/${fname}`))
        .on('error', (error) => reject('error: ' + error));
    });

    return imageUrl;
  }

  async deleteImageFile({ userId }) {
    const userInfo = await this.userRepository.findOne({ id: userId });

    const spliturl = userInfo.url.split(`${process.env.STORAGE_BUCKET}/`);
    const fileName = spliturl[spliturl.length - 1];
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILENAME,
      projectId: process.env.STORAGE_PROJECT_ID,
    });
    const result = await storage
      .bucket(process.env.STORAGE_BUCKET)
      .file(fileName)
      .delete();

    const { url, ...user } = userInfo;
    const deleteUrl = { ...user, url: null };
    await this.userRepository.save(deleteUrl);

    return result ? true : false;
  }
}
