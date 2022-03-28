import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { Storage } from '@google-cloud/storage';
import { v4 as uuidv4 } from 'uuid';
import { getToday } from 'src/libraries/utils';
import { FileUpload } from 'graphql-upload';

interface IFile {
  files: FileUpload[];
}

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly boardRepository: Repository<Board>,
  ) {}

  async findOne({ id }) {
    return await this.boardRepository.findOne({ id });
  }

  async create(scheduleId, { ...createBoardInput }) {
    return await this.boardRepository.save({
      ...createBoardInput,
      schedule: scheduleId,
    });
  }

  async update(boardId, { ...updateBoardInput }) {
    const boardInfo = await this.boardRepository.findOne({ id: boardId });

    const newBoard = {
      ...boardInfo,
      ...updateBoardInput,
    };
    return await this.boardRepository.save(newBoard);
  }

  async delete({ scheduleId }) {
    const result = await this.boardRepository.delete({ schedule: scheduleId });
    return result.affected ? true : false;
  }

  async findMyQt({ scheduleId }) {
    const myQts = await this.boardRepository
      .createQueryBuilder()
      .select('board')
      .from(Board, 'board')
      .where('board.scheduleId = :scheduleId', {
        scheduleId: scheduleId,
      })
      .orderBy('board.day', 'ASC')
      .getMany();

    return myQts;
  }

  async upload({ file }) {
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILENAME,
      projectId: process.env.STORAGE_PROJECT_ID,
    }).bucket(process.env.STORAGE_BUCKET);

    const fname = `board/${getToday()}/${uuidv4()}/${file.filename}`;
    const imageUrl = await new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(storage.file(fname).createWriteStream())
        .on('finish', () => resolve(`${process.env.STORAGE_BUCKET}/${fname}`))
        .on('error', (error) => reject('error: ' + error));
    });
    console.log('=============imageUrl==========================');
    console.log(imageUrl);
    console.log('===============================================');

    return imageUrl;
  }

  async deleteImageFile({ url }) {
    const spliturl = url.split(`${process.env.STORAGE_BUCKET}/`);
    const fileName = spliturl[spliturl.length - 1];
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILENAME,
      projectId: process.env.STORAGE_PROJECT_ID,
    });
    const result = await storage
      .bucket(process.env.STORAGE_BUCKET)
      .file(fileName)
      .delete();

    console.log('=========================================================');
    console.log(`gs://${process.env.STORAGE_BUCKET}/${fileName} deleted`);
    console.log('=========================================================');

    return result ? true : false;
  }
}
