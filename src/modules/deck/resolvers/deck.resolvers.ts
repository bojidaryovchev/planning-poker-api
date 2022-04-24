import { Mutation, Parent, Query, ResolveField, ResolveProperty, Resolver } from '@nestjs/graphql';
import { Deck, Game, User } from '@prisma/client';
import { Input } from '../../../decorators/input.decorator';
import { GameModel } from '../../game/models/game.model';
import { PrismaService } from '../../prisma/services/prisma.service';
import { UserModel } from '../../user/models/user.model';
import { CreateDeckInput } from '../inputs/createDeck.input';
import { DeleteDeckInput } from '../inputs/deleteDeck.input';
import { DeckModel } from '../models/deck.model';

@Resolver(DeckModel)
export class DeckResolvers {
  constructor(private prismaService: PrismaService) {}

  @Query(() => [DeckModel])
  async listDecks(): Promise<Deck[]> {
    return this.prismaService.deck.findMany({});
  }

  @Mutation(() => DeckModel)
  async createDeck(@Input(CreateDeckInput) { userId, name, cards, isDefault }: CreateDeckInput): Promise<Deck> {
    return this.prismaService.deck.create({
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
        name,
        cards,
        isDefault,
      },
    });
  }

  @ResolveField(() => UserModel, { nullable: true })
  async user(@Parent() deck: Deck): Promise<User> {
    const { userId } = deck;

    if (!userId) {
      return;
    }

    return this.prismaService.user.findUnique({
      where: {
        id: userId,
      },
    });
  }

  @ResolveProperty(() => [GameModel])
  async games(@Parent() deck: Deck): Promise<Game[]> {
    const { id } = deck;

    return this.prismaService.game.findMany({
      where: {
        deckId: id,
      },
    });
  }

  @Mutation(() => DeckModel)
  async deleteDeck(@Input(DeleteDeckInput) { id }: DeleteDeckInput): Promise<Deck> {
    return this.prismaService.deck.delete({
      where: {
        id,
      },
    });
  }
}
