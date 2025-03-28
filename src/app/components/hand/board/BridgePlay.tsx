import { Card, Direction, Suit } from '@/app/model/types';
import { CardSource } from '@/app/components/hand/board/CardSource';
import { rankOrder } from '@/app/model/constants';

export class BridgePlay {
  private slots: Partial<Record<Direction, Card>> = {};
  private playHistory: { direction: Direction; card: Card }[] = [];
  private startingDirection: Direction;
  private currentDirection: Direction;
  private source: CardSource;
  private trumpSuit: Suit | null;

  constructor(
    startingDirection: Direction,
    source: CardSource,
    trumpSuit: Suit | null,
  ) {
    this.startingDirection = startingDirection;
    this.currentDirection = startingDirection;
    this.source = source;
    this.trumpSuit = trumpSuit;
  }

  playCard(): void {
    if (this.playHistory.length > 0 && this.playHistory.length % 4 === 0) {
      this.slots = {};
    }
    const card = this.source.getNextCard();
    if (!card) return;
    this.slots[this.currentDirection] = card;
    this.playHistory.push({ direction: this.currentDirection, card });
    if (this.playHistory.length % 4 === 0) {
      this.currentDirection = this.determineTrickWinner();
    } else {
      this.currentDirection = this.nextDirection(this.currentDirection);
    }
  }

  hasPlayedCards(): boolean {
    return this.playHistory.length > 0;
  }

  hasNextCard(): boolean {
    return this.source.peekNextCard() !== null;
  }

  unplayLastCard(): void {
    const lastPlay = this.playHistory.pop();
    if (!lastPlay) return;
    this.slots[lastPlay.direction] = undefined;
    this.source.returnCard(lastPlay.card);
    this.currentDirection = lastPlay.direction;
  }

  unplayAll(): void {
    while (this.playHistory.length > 0) {
      this.unplayLastCard();
    }
    this.currentDirection = this.startingDirection;
  }

  private determineTrickWinner(): Direction {
    const trick = this.playHistory.slice(-4);
    const leadSuit = trick[0].card.suit;
    const trump = this.trumpSuit;
    trick.sort((a, b) => {
      const aTrump = a.card.suit === trump;
      const bTrump = b.card.suit === trump;
      const aLead = a.card.suit === leadSuit;
      const bLead = b.card.suit === leadSuit;

      if (aTrump !== bTrump) return aTrump ? -1 : 1;
      if (aLead !== bLead) return aLead ? -1 : 1;
      return rankOrder.indexOf(b.card.rank) - rankOrder.indexOf(a.card.rank);
    });
    return trick[0].direction;
  }

  private nextDirection(direction: Direction): Direction {
    const order: Direction[] = ['N', 'E', 'S', 'W'];
    return order[(order.indexOf(direction) + 1) % 4];
  }

  getCurrentDirection(): Direction {
    return this.currentDirection;
  }

  getPlayHistory(): { direction: Direction; card: Card }[] {
    return this.playHistory;
  }

  getSlots(): Partial<Record<Direction, Card>> {
    return this.slots;
  }
}
