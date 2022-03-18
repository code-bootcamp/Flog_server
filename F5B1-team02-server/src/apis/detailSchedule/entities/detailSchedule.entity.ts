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
  startDate: Date;

  @Column()
  @Field(() => String)
  endDate: Date;

  @Column()
  @Field(() => String)
  location: string;

  @Column()
  @Field(() => String)
  memo: string;

  @Column()
  @Field(() => String)
  day: string;

  // 일정
  @ManyToOne(() => Schedule, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => Schedule)
  schedule: Schedule;
}
