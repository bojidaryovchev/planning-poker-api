import { Field, ObjectType } from '@nestjs/graphql';
import { Deck, Game } from '@prisma/client';
import { DeckModel } from '../../deck/models/deck.model';
import { GameModel } from '../../game/models/game.model';

@ObjectType()
export class UserModel {
  @Field()
  id: string;

  @Field(() => String, { nullable: true })
  name?: string;

  @Field(() => [DeckModel], { nullable: true })
  decks?: Deck[];

  @Field(() => [GameModel], { nullable: true })
  games?: Game[];
}
