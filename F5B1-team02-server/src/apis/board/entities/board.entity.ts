import { Field, ObjectType } from '@nestjs/graphql';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import { Schedule } from 'src/apis/schedule/entities/schedule.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;
  // day: string;

  @Column()
  @Field(() => String)
  content: string;

  @CreateDateColumn() // 자동으로 날짜컬럼 생성
  createAt: Date;

  // 공유
  @Column({ default: false })
  @Field(() => Boolean)
  isShare: boolean;

  // 공유일자
  @CreateDateColumn()
  // @Column({ default: false, nullable: true })
  // @Field(() => String)
  shareDate: Date;

  // 일정
  @JoinColumn()
  @OneToOne(() => Schedule)
  numberPeople: Schedule;

  // 메인카테고리
  @ManyToOne(() => MainCategory, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => MainCategory)
  mainCategory: MainCategory;
}
