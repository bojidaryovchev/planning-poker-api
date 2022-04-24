import { Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { Deck, Game, User, Vote } from '@prisma/client';
import { DeckModel } from '../../deck/models/deck.model';
import { GameModel } from '../../game/models/game.model';
import { PrismaService } from '../../prisma/services/prisma.service';
import { VoteModel } from '../../vote/models/vote.model';
import { UserModel } from '../models/user.model';

@Resolver(UserModel)
export class UserResolver {
  constructor(private prismaService: PrismaService) {}

  @Query(() => [UserModel])
  async listUsers(): Promise<User[]> {
    return this.prismaService.user.findMany({});
  }

  @ResolveField(() => [DeckModel])
  async decks(@Parent() user: User): Promise<Deck[]> {
    const { id } = user;

    return this.prismaService.deck.findMany({
      where: {
        userId: id,
      },
    });
  }

  @ResolveField(() => [GameModel])
  async games(@Parent() user: User): Promise<Game[]> {
    const { id } = user;

    return this.prismaService.game.findMany({
      where: {
        userId: id,
      },
    });
  }

  @ResolveField(() => [VoteModel])
  async votes(@Parent() user: User): Promise<Vote[]> {
    const { id } = user;

    return this.prismaService.vote.findMany({
      where: {
        userId: id,
      },
    });
  }
}
