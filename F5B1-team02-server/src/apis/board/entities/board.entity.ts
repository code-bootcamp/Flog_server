import { Field, ObjectType } from '@nestjs/graphql';
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

  @Column()
  @Field(() => String)
  day: string;

  @Column({ type: 'longtext' })
  @Field(() => String)
  content: string;

  @CreateDateColumn()
  createAt: Date;

  // 일정
  @ManyToOne(() => Schedule, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => Schedule)
  schedule: Schedule;
}
