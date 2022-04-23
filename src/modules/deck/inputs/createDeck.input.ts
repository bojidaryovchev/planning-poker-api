import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateDeckInput {
  @Field()
  name: string;

  @Field()
  cards: string;
}
