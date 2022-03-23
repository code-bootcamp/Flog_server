import { Field, ObjectType } from '@nestjs/graphql';
import { Schedule } from 'src/apis/schedule/entities/schedule.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class DetailSchedule {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  day: string;

  @Column()
  @Field(() => String)
  date: string;

  @Column()
  @Field(() => String)
  startTime: string;

  @Column()
  @Field(() => String)
  useTime: string;

  @Column()
  @Field(() => String)
  place: string;

  @Column({ default: null })
  @Field(() => String, { nullable: true })
  memo?: string;

  // 일정
  @ManyToOne(() => Schedule, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => Schedule)
  schedule: Schedule;
}
