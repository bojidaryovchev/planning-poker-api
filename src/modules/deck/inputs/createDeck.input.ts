import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDeckInput {
  @Field(() => String, { nullable: true })
  userId?: string;

  @Field()
  name: string;

  @Field()
  cards: string;

  @Field(() => Boolean, { nullable: true })
  isDefault?: boolean;
}
