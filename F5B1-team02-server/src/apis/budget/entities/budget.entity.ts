import { Field, Int, ObjectType } from '@nestjs/graphql';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Budget {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column()
  @Field(() => Int)
  totalAmount: number;

  //   @ManyToOne(()=>)
  //   schedule:Schedule

  // @OneToMany(() => MainCategory)
  // @Field(())
  // maincategory: MainCategory;
}
