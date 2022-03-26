import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from '../schedule/entities/schedule.entity';
import { getToday } from 'src/libraries/utils';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class BannerImageService {
  constructor(
    @InjectRepository(Schedule)
    private readonly scheduleRepositroy: Repository<Schedule>,
  ) {}

  async upload({ file }) {
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILENAME,
      projectId: process.env.STORAGE_PROJECT_ID,
    }).bucket(process.env.STORAGE_BUCKET);

    const fname = `${getToday()}/${uuidv4()}/origin/${file.filename}`;
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

  async deleteImageFile({ scheduleId }) {
    const deleteFile = await this.scheduleRepositroy.findOne({
      id: scheduleId,
    });
    const { url, ...schedule } = deleteFile;

    const spliturl = deleteFile.url.split(`${process.env.STORAGE_BUCKET}/`);
    const fileName = spliturl[spliturl.length - 1];
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILENAME,
      projectId: process.env.STORAGE_PROJECT_ID,
    });
    const result = await storage
      .bucket(process.env.STORAGE_BUCKET)
      .file(fileName)
      .delete();

    console.log(`gs://${process.env.STORAGE_BUCKET}/${fileName} deleted`);
    await this.scheduleRepositroy.save({ ...schedule, url: null });
    return result ? true : false;
  }

  async update({ scheduleId, updateBannerImageInput }) {
    const scheduleInfo = await this.scheduleRepositroy.findOne({
      id: scheduleId,
    });

    const newUrl = {
      ...scheduleInfo,
      ...updateBannerImageInput,
    };
    return await this.scheduleRepositroy.save(newUrl);
  }
}
