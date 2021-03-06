import { Mutation, Parent, Query, ResolveField, Resolver, Subscription } from '@nestjs/graphql';
import { Game, Vote, Voting } from '@prisma/client';
import { PubSub } from 'graphql-subscriptions';
import { Input } from '../../../common/decorators/input.decorator';
import { GameModel } from '../../game/models/game.model';
import { PrismaService } from '../../prisma/services/prisma.service';
import { VoteModel } from '../../vote/models/vote.model';
import { CreateVotingInput } from '../inputs/createVoting.input';
import { UpdateVotingInput } from '../inputs/updateVoting.input';
import { VotingModel } from '../models/voting.model';

const pubSub = new PubSub();

@Resolver(VotingModel)
export class VotingResolvers {
  constructor(private prismaService: PrismaService) {}

  @Query(() => [VotingModel])
  async listVotings(): Promise<Voting[]> {
    return this.prismaService.voting.findMany({});
  }

  @Mutation(() => VotingModel)
  async createVoting(@Input(CreateVotingInput) { gameId }: CreateVotingInput): Promise<Voting> {
    const voting = this.prismaService.voting.create({
      data: {
        game: {
          connect: {
            id: gameId,
          },
        },
      },
    });

    pubSub.publish('votingCreated', { votingCreated: voting });

    return voting;
  }

  @Mutation(() => VotingModel)
  async updateVoting(@Input(UpdateVotingInput) { id, hasFinished }: UpdateVotingInput): Promise<Voting> {
    return this.prismaService.voting.update({
      where: {
        id,
      },
      data: {
        hasFinished,
      },
    });
  }

  @ResolveField(() => GameModel)
  async game(@Parent() voting: Voting): Promise<Game> {
    const { gameId } = voting;

    return this.prismaService.game.findUnique({
      where: {
        id: gameId,
      },
    });
  }

  @ResolveField(() => [VoteModel])
  async votes(@Parent() voting: Voting): Promise<Vote[]> {
    const { id } = voting;

    return this.prismaService.vote.findMany({
      where: {
        votingId: id,
      },
    });
  }

  @Subscription(() => VotingModel)
  votingCreated() {
    return pubSub.asyncIterator('votingCreated');
  }
}
