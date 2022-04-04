import { Field, ObjectType, Int } from '@nestjs/graphql';
import { MainCategory } from 'src/apis/mainCategory/entities/mainCategory.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column()
  password: string;

  @Column()
  @Field(() => String)
  nickName: string;

  @Column({ default: null })
  @Field(() => String, { nullable: true })
  phoneNumber?: string;

  // 총 포인트
  @Column({ default: 0 })
  @Field(() => Int)
  point: number;

  // 프로필 이미지
  @Column({ default: null })
  @Field(() => String, { nullable: true })
  url: string;

  @ManyToOne(() => MainCategory, { cascade: true, onDelete: 'CASCADE' })
  @Field(() => MainCategory)
  mainCategory: MainCategory;
}
