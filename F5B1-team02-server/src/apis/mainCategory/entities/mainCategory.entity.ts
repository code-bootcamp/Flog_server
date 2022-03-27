import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum MAINCATEGORY_ENUM {
  MINE = '나의 여행',
  OUR = '우리의 여행',
  MYPAGE = '마이페이지',
}
registerEnumType(MAINCATEGORY_ENUM, {
  name: 'MAINCATEGORY_ENUM',
});
console.log('✨');
@Entity()
@ObjectType()
export class MainCategory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ type: 'enum', enum: MAINCATEGORY_ENUM })
  @Field(() => MAINCATEGORY_ENUM)
  name: MAINCATEGORY_ENUM;
}
