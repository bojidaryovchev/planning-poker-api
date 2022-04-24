import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { VotingResolvers } from './resolvers/voting.resolvers';

@Module({
  imports: [PrismaModule],
  providers: [VotingResolvers],
})
export class VotingModule {}
