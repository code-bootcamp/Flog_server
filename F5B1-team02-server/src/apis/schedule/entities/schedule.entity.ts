import { Field, ObjectType } from '@nestjs/graphql';
import { BannerImage } from 'src/apis/bannerImage/entities/bannerImage.entity';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import { NumberPeople } from 'src/apis/numberPeople/entities/numberPeople.entity';
import { TravelTheme } from 'src/apis/travelTheme/entities/travelTheme.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

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
  startDate: Date;

  @Column()
  @Field(() => String)
  endDate: Date;

  // 여행테마
  @JoinColumn()
  @OneToOne(() => TravelTheme)
  travelTheme: TravelTheme;

  // 인원수
  @JoinColumn()
  @OneToOne(() => NumberPeople)
  numberPeople: NumberPeople;

  // 사용자계정
  @ManyToOne(() => User, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;

  // 배너이미지
  @JoinColumn()
  @OneToOne(() => BannerImage)
  @Field(() => BannerImage)
  bannerImage: BannerImage;

  // 메인카테고리
  @ManyToOne(() => MainCategory, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => MainCategory)
  mainCategory: MainCategory;
}
