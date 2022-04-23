import { Injectable } from '@nestjs/common';
import { Deck, Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma/services/prisma.service';

@Injectable()
export class DeckService {
  constructor(private prisma: PrismaService) {}

  async deck(deckWhereUniqueInput: Prisma.DeckWhereUniqueInput): Promise<Deck | null> {
    return this.prisma.deck.findUnique({
      where: deckWhereUniqueInput,
    });
  }

  async decks(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DeckWhereUniqueInput;
    where?: Prisma.DeckWhereInput;
    orderBy?: Prisma.DeckOrderByWithRelationInput;
  }): Promise<Deck[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.deck.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createDeck(data: Prisma.DeckCreateInput): Promise<Deck> {
    return this.prisma.deck.create({
      data,
    });
  }

  async updateDeck(params: { where: Prisma.DeckWhereUniqueInput; data: Prisma.DeckUpdateInput }): Promise<Deck> {
    const { where, data } = params;
    return this.prisma.deck.update({
      data,
      where,
    });
  }

  async deleteDeck(where: Prisma.DeckWhereUniqueInput): Promise<Deck> {
    return this.prisma.deck.delete({
      where,
    });
  }
}
