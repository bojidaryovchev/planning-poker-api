import { Module } from '@nestjs/common';
import { DeckModule } from './deck/deck.module';
import { GraphqlModule } from './graphql/graphql.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [GraphqlModule, UsersModule, DeckModule],
})
export class AppModule {}
