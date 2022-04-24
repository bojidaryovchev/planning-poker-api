import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { GameResolvers } from './resolvers/game.resolvers';

@Module({
  imports: [PrismaModule],
  providers: [GameResolvers],
})
export class GameModule {}
