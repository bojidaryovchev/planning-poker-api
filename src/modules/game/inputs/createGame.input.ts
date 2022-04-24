import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateGameInput {
  @Field(() => String, { nullable: true })
  userId?: string;

  @Field()
  deckId: string;

  @Field()
  name: string;
}
