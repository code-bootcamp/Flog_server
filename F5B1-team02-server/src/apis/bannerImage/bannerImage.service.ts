import { Injectable } from '@nestjs/common';
import { FileUpload } from 'graphql-upload';
import { Storage } from '@google-cloud/storage';

interface IFile {
  file: FileUpload;
}

@Injectable()
export class BannerImageService {
  async upload({ file }: IFile) {
    // 스토리지에 이미지 업로드
    const storage = new Storage({
      keyFilename: process.env.STORAGE_KEY_FILENAME,
      projectId: process.env.STORAGE_PROJECT_ID,
    })
      .bucket(process.env.STORAGE_BUCKET)
      .file(file.filename);

    const result = await new Promise((resolve, reject) => {
      file
        .createReadStream()
        .pipe(storage.createWriteStream())
        .on('finish', () =>
          resolve(`${process.env.STORAGE_BUCKET}/${file.filename}`),
        )
        .on('error', (error) => reject(error));
    });

    return result;
  }
}
