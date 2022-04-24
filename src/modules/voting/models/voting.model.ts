import { Field, GraphQLISODateTime, ObjectType } from '@nestjs/graphql';
import { Game, Vote } from '@prisma/client';
import { GameModel } from '../../game/models/game.model';
import { VoteModel } from '../../vote/models/vote.model';

@ObjectType()
export class VotingModel {
  @Field()
  id: string;

  @Field()
  gameId: string;

  @Field(() => GameModel)
  game: Game;

  @Field(() => Boolean, { nullable: true })
  hasFinished?: boolean;

  @Field(() => GraphQLISODateTime, { nullable: true })
  createdAt?: string;

  @Field(() => [VoteModel])
  votes: Vote[];
}
