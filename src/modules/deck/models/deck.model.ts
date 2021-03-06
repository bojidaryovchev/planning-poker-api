import { Field, ObjectType } from '@nestjs/graphql';
import { Game, User } from '@prisma/client';
import { GameModel } from '../../game/models/game.model';
import { UserModel } from '../../user/models/user.model';

@ObjectType()
export class DeckModel {
  @Field()
  id: string;

  @Field(() => String, { nullable: true })
  userId?: string;

  @Field(() => UserModel, { nullable: true })
  user?: User;

  @Field()
  name: string;

  @Field()
  cards: string;

  @Field(() => Boolean, { nullable: true })
  isDefault?: boolean;

  @Field(() => [GameModel])
  games: Game[];
}
