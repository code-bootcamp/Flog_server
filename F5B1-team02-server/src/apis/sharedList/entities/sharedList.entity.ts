import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Board } from 'src/apis/board/entities/board.entity';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import { Schedule } from 'src/apis/schedule/entities/schedule.entity';
import {
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class SharedList {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  // 메인카테고리
  @ManyToOne(() => MainCategory, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => MainCategory)
  mainCategory: MainCategory;

  // 일정
  @JoinColumn()
  @OneToOne(() => Schedule)
  @Field(() => Schedule)
  schedule: Schedule;

  // 여행로그
  @JoinColumn()
  @OneToOne(() => Board)
  @Field(() => Board)
  board: Board;
}
