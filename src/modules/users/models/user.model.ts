import { Field, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field()
  @IsEmail()
  email: string;
}
