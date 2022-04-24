import { Parent, Query, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Deck, Game, User } from '@prisma/client';
import { DeckModel } from '../../deck/models/deck.model';
import { GameModel } from '../../game/models/game.model';
import { PrismaService } from '../../prisma/services/prisma.service';
import { UserModel } from '../models/user.model';

@Resolver(UserModel)
export class UserResolver {
  constructor(private prismaService: PrismaService) {}

  @Query(() => [UserModel])
  async listUsers(): Promise<User[]> {
    return this.prismaService.user.findMany({});
  }

  @ResolveProperty(() => [DeckModel])
  async decks(@Parent() user: User): Promise<Deck[]> {
    const { id } = user;

    return this.prismaService.deck.findMany({
      where: {
        userId: id,
      },
    });
  }

  @ResolveProperty(() => [GameModel])
  async games(@Parent() user: User): Promise<Game[]> {
    const { id } = user;

    return this.prismaService.game.findMany({
      where: {
        userId: id,
      },
    });
  }
}
