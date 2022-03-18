import { Field, ObjectType, Int } from '@nestjs/graphql';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Column()
  @Field(() => String)
  nickName: string;

  @Column()
  @Field(() => Int)
  phoneNumber: number;

  @Column()
  @Field(() => String)
  gender: string;

  // 프로필 이미지 다시 확인??
  @Column({ default: false })
  @Field(() => String)
  url: string;

  @ManyToOne(() => MainCategory, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => MainCategory)
  mainCategory: MainCategory;
}
