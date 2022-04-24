import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { VoteResolvers } from './resolvers/vote.resolvers';

@Module({
  imports: [PrismaModule],
  providers: [VoteResolvers],
})
export class VoteModule {}
