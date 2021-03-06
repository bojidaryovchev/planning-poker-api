import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DeckResolvers } from './resolvers/deck.resolvers';

@Module({
  imports: [PrismaModule],
  providers: [DeckResolvers],
})
export class DeckModule {}
