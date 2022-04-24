import { Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { User, Vote, Voting } from '@prisma/client';
import { Input } from '../../../decorators/input.decorator';
import { PrismaService } from '../../prisma/services/prisma.service';
import { UserModel } from '../../user/models/user.model';
import { VotingModel } from '../../voting/models/voting.model';
import { CreateVoteInput } from '../inputs/createVote.input';
import { VoteModel } from '../models/vote.model';

@Resolver(VoteModel)
export class VoteResolvers {
  constructor(private prismaService: PrismaService) {}

  @Query(() => [VoteModel])
  async listVotes(): Promise<Vote[]> {
    return this.prismaService.vote.findMany({});
  }

  @Mutation(() => VoteModel)
  async createVote(@Input(CreateVoteInput) { userId, votingId, card }: CreateVoteInput): Promise<Vote> {
    return this.prismaService.vote.create({
      data: {
        user: {
          connect: {
            id: userId,
          },
        },
        voting: {
          connect: {
            id: votingId,
          },
        },
        card,
      },
    });
  }

  @ResolveField(() => UserModel)
  async user(@Parent() vote: Vote): Promise<User> {
    const { userId } = vote;

    return this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  @ResolveField(() => VotingModel)
  async voting(@Parent() vote: Vote): Promise<Voting> {
    const { votingId } = vote;

    return this.prismaService.voting.findUnique({
      where: {
        id: votingId,
      },
    });
  }
}
