import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { DeckResolvers } from './resolvers/deck.resolvers';
import { DeckService } from './services/deck.service';

@Module({
  imports: [PrismaModule],
  providers: [DeckService, DeckResolvers],
})
export class DeckModule {}
