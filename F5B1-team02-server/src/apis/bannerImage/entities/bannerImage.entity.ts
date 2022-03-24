import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Field(() => Boolean)
  isImage: boolean;
}
