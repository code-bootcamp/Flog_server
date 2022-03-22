import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';
import { Repository } from 'typeorm';
import { BannerImage } from './entities/bannerImage.entity';

@Injectable()
export class BannerImageService {
  constructor(
    @InjectRepository(BannerImage)
    private readonly bannerimageRepository: Repository<BannerImage>,
  ) {}

  async findOne({ id }) {
    await this.bannerimageRepository.findOne({ id });
  }

  async upload({ file }) {
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILENAME,
      projectId: process.env.STORAGE_PROJECT_ID,
    }).bucket(process.env.STORAGE_BUCKET);

    const result = await new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(storage.file(file.filename).createWriteStream())
        .on('finish', () =>
          resolve(`${process.env.STORAGE_BUCKET}/${file.filename}`),
        )
        .on('error', (error) => reject('error: ' + error));
    });

    return result;
  }
}
