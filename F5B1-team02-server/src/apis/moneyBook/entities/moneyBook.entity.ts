import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Budget } from 'src/apis/budget/entities/budget.entity';
import { SpendingCategory } from 'src/apis/spendingCategory/entities/spendingCategory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class DetailSchedule {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @ManyToOne(() => Budget)
  budget: Budget;

  @ManyToOne(() => SpendingCategory)
  category: SpendingCategory;

  @Column()
  @Field(() => String)
  date: string;

  @Column()
  @Field(() => String)
  time: string;

  @Column()
  @Field(() => String)
  context: string;

  @Column()
  @Field(() => String)
  memo: string;

  @Column()
  @Field(() => Int)
  amount: number;
}
