import { Module } from '@nestjs/common';
import { DeckModule } from './deck/deck.module';
import { GameModule } from './game/game.module';
import { GraphqlModule } from './graphql/graphql.module';
import { UserModule } from './user/user.module';
import { VoteModule } from './vote/vote.module';
import { VotingModule } from './voting/voting.module';

@Module({
  imports: [GraphqlModule, UserModule, DeckModule, GameModule, VotingModule, VoteModule],
})
export class AppModule {}
