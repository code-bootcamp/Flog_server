import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import { PointTransaction } from 'src/apis/pointTranscation/entities/pointTransaction.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM {
  CHARGE = 'CHARGE', //충전
  PAYMENT = 'PAYMENT', //사용
  EARN = 'EARN', //적립
  CANCEL = 'CANCEL', //결제취소
}
registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  name: 'POINT_TRANSACTION_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class PointHistory {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ default: 0 })
  @Field(() => Int)
  changed: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
  @Field(() => POINT_TRANSACTION_STATUS_ENUM)
  status: POINT_TRANSACTION_STATUS_ENUM;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @Column({ default: 0 })
  @Field(() => Int)
  current: number;

  @JoinColumn()
  @OneToOne(() => PointTransaction)
  @Field(() => PointTransaction)
  pointId: PointTransaction;

  @JoinColumn()
  @ManyToOne(() => MainCategory, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => MainCategory)
  mainCategory: MainCategory;
}
