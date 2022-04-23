import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class DeckModel {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => String)
  cards: string;
}
