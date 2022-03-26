import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';
import { InjectRepository } from '@nestjs/typeorm';
import { BannerImage } from './entities/bannerImage.entity';
import { Repository } from 'typeorm';
import { Schedule } from '../schedule/entities/schedule.entity';
import { getToday } from 'src/libraries/utils';
import { v4 as uuidv4 } from 'uuid';
const { v4: uuidv4 } = require('uuid');

interface IFile {
  file: FileUpload;
}

@Injectable()
export class BannerImageService {
  constructor(
    @InjectRepository(BannerImage)
    private readonly bannerImageRepositroy: Repository<BannerImage>,
    @InjectRepository(Schedule)
    private readonly scheduleRepositroy: Repository<Schedule>,
  ) {}
  async upload({ file }) {
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILENAME,
      projectId: process.env.STORAGE_PROJECT_ID,
    })
      .bucket(process.env.STORAGE_BUCKET)
      .file(file.filename);

    const fname = `${getToday()}/${uuidv4()}/origin/${file.filename}`;
    const url = await new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(storage.createWriteStream())
        // .pipe(storage.file(fname).createWriteStream())
        .on('finish', () => resolve(`${process.env.STORAGE_BUCKET}/${fname}`))
        .on('error', (error) => reject(error));
    });

    console.log(url);

    return url;
  }

  // async create({ scheduleId, imageURL }) {
  //   // const deleteFile = await this.bannerImageRepositroy.findOne({
  //   //   id: productImageId,
  //   // });
  //   // const spliturl = deleteFile.imageURL.split('/');
  //   // const fileName = spliturl[spliturl.length - 1];
  //   const img = await this.bannerImageRepositroy.find
  //   const storage = new Storage({
  //     keyFilename: process.env.STORAGE_KEY_FILENAME,
  //     projectId: process.env.STORAGE_PROJECT_ID,
  //   });

  //   await storage.bucket(process.env.STORAGE_BUCKET).file(fileName).delete();

  //   const schedule = await this.bannerImageRepositroy.save({
  //     schedule: scheduleId,
  //     url: imageURL,
  //   });

  //   console.log(schedule);
  //   return schedule;
  // }

  // async update({ scheduleId, url }) {
  //   await this.bannerImageRepositroy.delete({ schedule: scheduleId });
  //   const schedule = await this.scheduleRepositroy.findOne({ id: scheduleId });

  //   return await this.bannerImageRepositroy.save({ schedule, url });
  // }
}
