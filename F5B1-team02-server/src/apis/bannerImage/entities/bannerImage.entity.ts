import { Field, ObjectType } from '@nestjs/graphql';
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
export class BannerImage {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: null })
  @Field(() => String, { nullable: true })
  url?: string;

  @Column({ default: false })
  @Field(() => Boolean, { nullable: true })
  isImage?: boolean;

  // 일정ID
  // @JoinColumn()
  // @OneToOne(() => Schedule)
  @ManyToOne(() => Schedule, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => Schedule)
  schedule: Schedule;
}
