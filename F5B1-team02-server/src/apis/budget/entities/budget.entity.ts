import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import { Schedule } from 'src/apis/schedule/entities/schedule.entity';
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
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: 0 })
  @Field(() => Int)
  amount: number;

  @Column({ default: 0 })
  @Field(() => Int)
  totalAmount: number;

  @JoinColumn()
  @OneToOne(() => Schedule)
  schedule: Schedule;

  @JoinColumn()
  @ManyToOne(() => MainCategory, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => MainCategory)
  mainCategory: MainCategory;
}
