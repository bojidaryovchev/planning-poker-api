import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { Deck } from '@prisma/client';
import { Input } from '../../../decorators/input.decorator';
import { CreateDeckInput } from '../inputs/createDeck.input';
import { DeleteDeckInput } from '../inputs/deleteDeck.input';
import { DeckModel } from '../models/deck.model';
import { DeckService } from '../services/deck.service';

@Resolver(DeckModel)
export class DeckResolvers {
  constructor(private deckService: DeckService) {}

  @Query(() => [DeckModel], { nullable: true })
  async listDecks(): Promise<Deck[]> {
    return this.deckService.decks({});
  }

  @Mutation(() => DeckModel)
  async createDeck(@Input(CreateDeckInput) { name, cards }: CreateDeckInput): Promise<Deck> {
    return this.deckService.createDeck({
      name,
      cards,
    });
  }

  @Mutation(() => DeckModel)
  async deleteDeck(@Input(DeleteDeckInput) { id }: DeleteDeckInput): Promise<Deck> {
    return this.deckService.deleteDeck({
      id,
    });
  }
}
