import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum NUMBER_PEOPLE_ENUM {
  ONE = '1명', // 1명
  TWO = '2명', // 2명
  THREE = '3명', // 3명
  FOUR = '4명', // 4명
  GROUP = '단체', // 단체
}

registerEnumType(NUMBER_PEOPLE_ENUM, {
  name: 'NUMBER_PEOPLE_ENUM',
});
export enum HASHTAG {
  ALONE = '혼자서', // 혼자서
  FRIEND = '친구', // 친구
  FAMILY = '가족', // 가족
  COUPLE = '커플', // 커플
  PET = '반려동물', // 반려동물
}

registerEnumType(HASHTAG, {
  name: 'HASHTAG',
});

@Entity()
@ObjectType()
export class Schedule {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  title: string;

  @Column()
  @Field(() => String)
  location: string;

  @Column()
  @Field(() => String)
  startDate: String;

  @Column()
  @Field(() => String)
  endDate: String;

  // 배너이미지
  @Column({ default: null })
  @Field(() => String, { nullable: true })
  url?: string;

  // 공유여부
  @Column({ default: 0 })
  @Field(() => String)
  isShare: String;

  // 인원수
  @Column({ type: 'enum', enum: NUMBER_PEOPLE_ENUM })
  @Field(() => NUMBER_PEOPLE_ENUM, { nullable: true })
  numberPeople: NUMBER_PEOPLE_ENUM;

  // 해시태그
  @Column({ type: 'enum', enum: HASHTAG })
  @Field(() => HASHTAG)
  hashtag: HASHTAG;

  // 사용자계정
  @ManyToOne(() => User, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  // 메인카테고리
  @ManyToOne(() => MainCategory, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => MainCategory)
  mainCategory: MainCategory;

  // 작성날짜
  @CreateDateColumn()
  @Field(() => Date)
  createAt: Date;

  @UpdateDateColumn()
  updatedat: Date;

  @Column()
  @Field(() => String)
  tripdates: string;
}
