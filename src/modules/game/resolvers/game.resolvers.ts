import { Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Deck, Game, User, Voting } from '@prisma/client';
import { Input } from '../../../common/decorators/input.decorator';
import { DeckModel } from '../../deck/models/deck.model';
import { PrismaService } from '../../prisma/services/prisma.service';
import { UserModel } from '../../user/models/user.model';
import { VotingModel } from '../../voting/models/voting.model';
import { CreateGameInput } from '../inputs/createGame.input';
import { DeleteGameInput } from '../inputs/deleteGame.input';
import { GameModel } from '../models/game.model';

@Resolver(GameModel)
export class GameResolvers {
  constructor(private prismaService: PrismaService) {}

  @Query(() => [GameModel])
  async listGames(): Promise<Game[]> {
    return this.prismaService.game.findMany({});
  }

  @Mutation(() => GameModel)
  async createGame(@Input(CreateGameInput) { userId, deckId, name }: CreateGameInput): Promise<Game> {
    return this.prismaService.game.create({
      data: {
        user: {
          ...(userId
            ? {
                connect: {
                  id: userId,
                },
              }
            : {
                create: {},
              }),
        },
        deck: {
          connect: {
            id: deckId,
          },
        },
        name,
      },
    });
  }

  @Mutation(() => GameModel)
  async deleteGame(@Input(DeleteGameInput) { id }: DeleteGameInput): Promise<Game> {
    return this.prismaService.game.delete({
      where: {
        id,
      },
    });
  }

  @ResolveField(() => UserModel, { nullable: true })
  async user(@Parent() game: Game): Promise<User> {
    const { userId } = game;

    if (!userId) {
      return;
    }

    return this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  @ResolveField(() => DeckModel)
  async deck(@Parent() game: Game): Promise<Deck> {
    const { deckId } = game;

    return this.prismaService.deck.findUnique({
      where: {
        id: deckId,
      },
    });
  }

  @ResolveField(() => [VotingModel])
  async votings(@Parent() game: Game): Promise<Voting[]> {
    const { id } = game;

    return this.prismaService.voting.findMany({
      where: {
        gameId: id,
      },
    });
  }
}
