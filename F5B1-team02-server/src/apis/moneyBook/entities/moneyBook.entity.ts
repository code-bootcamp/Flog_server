import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Budget } from 'src/apis/budget/entities/budget.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum SPENDING_CATEGORY_STATUS_ENUM {
  FOOD = 'FOOD',
  SHOPPING = 'SHOPPING',
  TRANSPORTATION = 'TRANSPORTATION',
  TOURISM = 'TOURISM',
  STAY = 'STAY',
  ETC = 'ETC',
}
registerEnumType(SPENDING_CATEGORY_STATUS_ENUM, {
  name: 'SPENDING_CATEGORY_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class MoneyBook {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => Budget)
  budget: Budget;

  @Column({ default: false })
  @Field(() => String)
  date: string;

  @Column({ type: 'enum', enum: SPENDING_CATEGORY_STATUS_ENUM })
  @Field(() => SPENDING_CATEGORY_STATUS_ENUM)
  status: SPENDING_CATEGORY_STATUS_ENUM;

  @Column({ default: false })
  @Field(() => String)
  time: string;

  @Column({ default: false })
  @Field(() => String)
  context: string;

  @Column({ default: false })
  @Field(() => String)
  memo: string;

  @Column({ default: 0 })
  @Field(() => Int)
  amount: number;

  @Column()
  @Field(() => String)
  tripdates: string;
}
