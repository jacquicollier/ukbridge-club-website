import { Card } from '@/app/model/types';

export class CardSource {
  private cards: Card[];

  constructor(cards: Card[]) {
    this.cards = [...cards];
  }

  getNextCard(): Card | null {
    return this.cards.length > 0 ? this.cards.pop()! : null;
  }

  returnCard(card: Card): void {
    this.cards.push(card);
  }

  peekNextCard(): Card | null {
    return this.cards.length > 0 ? this.cards[this.cards.length - 1] : null;
  }
}
