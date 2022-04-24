import { Field, ObjectType } from '@nestjs/graphql';
import { Deck, User } from '@prisma/client';
import { DeckModel } from '../../deck/models/deck.model';
import { UserModel } from '../../user/models/user.model';

@ObjectType()
export class GameModel {
  @Field()
  id: string;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => UserModel, { nullable: true })
  user?: User;

  @Field()
  deckId: string;

  @Field(() => DeckModel)
  deck: Deck;

  @Field()
  name: string;
}
