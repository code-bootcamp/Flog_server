// import { ConflictException, Injectable } from '@nestjs/common';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Product } from '../product/entities/product.entity';
// import { ProductImage } from './entities/productImage.entity';
// import { File, Storage } from '@google-cloud/storage';

// @Injectable()
// export class ProductImageService {
//   constructor(
//     @InjectRepository(ProductImage)
//     private readonly productImageRepository: Repository<ProductImage>,
//     @InjectRepository(Product)
//     private readonly productRepository: Repository<Product>, // @InjectRepository(File) // private readonly fileRepository: Repository<File>
//   ) {}
//   // async findAll() {
//   //   return await this.productImageRepository.find({
//   //     relations: ['userType'],
//   //   });
//   // }

//   // async findOne({ productImageId }) {
//   //   const resultOfImage = await this.productImageRepository.findOne({
//   //     where: { id: productImageId },
//   //     relations: ['product'],
//   //     // where: { deletedAt: null },
//   //   }); //productImageId는 resolver에서 받아온것
//   //   return resultOfImage;
//   // }

//   async create({ name, productId, imageURL }) {
//     const product = await this.productRepository.create({
//       id: productId,
//     });

//     const products = await Promise.all(
//       imageURL.map((url) => {
//         return this.productImageRepository.save({
//           name,
//           product: product,
//           imageURL: url,
//         });
//       }),
//     );

//     console.log(products);
//     return products;
//   }

//   async update1({ name, productId, urls }) {
//     const result1 = await this.productImageRepository.softDelete({
//       product: productId,
//     });
//     urls.map((url) => {
//       return this.productImageRepository.save({
//         name,
//         product: productId,
//         imageURL: url,
//       });
//     });
//   }

//   async update2({ name, productId, urls }) {
//     const result1 = await this.productImageRepository.find({
//       product: productId,
//     });
//     const result2 = urls.map((url) => {
//       result1.map((x) => {
//         if (url === x.imageURL) {
//           return;

//           // console.log("이미 등록된 이미지 입니다.")
//         }
//         if (x.imageURL !== url) {
//           return this.productImageRepository.softDelete({
//             imageURL: x.imageURL,
//           });
//         }
//       });
//       return this.productImageRepository.save({
//         name,
//         product: productId,
//         imageURL: url,
//       });
//     });
//   }

//   async deleteImageFile({ productImageId }) {
//     // const deleteFile = await this.productImageRepository.findOne({
//     //   id: productImageId,
//     // });
//     const deleteFile = await this.productImageRepository.findOne({
//       id: productImageId,
//     });
//     const spliturl = deleteFile.imageURL.split('/');
//     const fileName = spliturl[spliturl.length - 1];
//     const storage = new Storage({
//       keyFilename: process.env.GCP_KEY_FILENAME,
//       projectId: process.env.GCP_PROJECT_ID,
//     });

//     await storage.bucket(process.env.GCP_BUCKET).file(fileName).delete();

//     const result = await this.productImageRepository.softDelete({
//       id: productImageId,
//     });
//     return result.affected ? true : false;
//   }

//   async delete({ productImageId }) {
//     const result = await this.productImageRepository.softDelete({
//       id: productImageId,
//     });
//     return result.affected ? true : false;
//   }
// }
