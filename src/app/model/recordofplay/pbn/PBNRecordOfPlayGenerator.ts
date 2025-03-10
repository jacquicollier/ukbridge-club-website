import { RecordOfPlayGenerator } from '@/app/model/recordofplay/RecordOfPlayGenerator';
import { Hand } from '@/app/model/recordofplay/pbn/hand';
import { Card, Direction, Rank, Suit } from '@/app/model/types';
import { Directions, suitOrder } from '@/app/model/constants';
import {
  determineTrickWinner,
  determineTrumps,
} from '@/app/model/recordofplay/utils';

export class PBNRecordOfPlayGenerator extends RecordOfPlayGenerator {
  private readonly hand: Hand;
  private readonly deal: { [key in Direction]: Card[] };
  private readonly trumps: string | null;
  private readonly playedCards: Card[];

  constructor(hand: Hand) {
    super();
    this.hand = hand;
    this.deal = this.parseBridgeHand();
    this.trumps = determineTrumps(hand.contract);
    this.playedCards = this.findPlayedCards();
  }

  getContract(): string {
    return this.hand.contract;
  }

  getDealer(): Direction {
    return this.hand.dealer as Direction;
  }

  getDeclarer(): Direction {
    return this.hand.declarer as Direction;
  }

  getDeal(): { [key in Direction]: Card[] } {
    return this.deal;
  }

  getScoreHeadings(): string[] {
    if (this.hand.scoretable) {
      const keyValuePairs = this.hand.scoretable!.value.split(';');
      return keyValuePairs.map((pair) => pair.split('\\')[0]);
    } else {
      return [];
    }
  }

  getScores(): string[][] {
    if (this.hand.scoretable) {
      return this.hand.scoretable!.details.map((it) => it.trim().split(/\s+/));
    }
    return [];
  }

  getScore(): string {
    return this.hand.score ?? '';
  }

  getScoreImp(): string {
    return this.hand.scoreimp ?? '';
  }

  getNsVulnerable(): boolean {
    return ['NS', 'Both', 'All'].includes(this.hand.vulnerable);
  }

  getEwVulnerable(): boolean {
    return ['EW', 'Both', 'All'].includes(this.hand.vulnerable);
  }

  getBoard(): number {
    return Number(this.hand.board);
  }

  getBids(): string[] | null {
    return this.hand.auction.details.flatMap((line) => line.split(' '));
  }

  getOpener(): Direction {
    return this.hand.auction.value as Direction;
  }

  getTrumps(): string | null {
    return this.trumps;
  }

  getPlayers(): { [key in Direction]: string } {
    return {
      N: this.hand.north ?? '',
      E: this.hand.east ?? '',
      S: this.hand.south ?? '',
      W: this.hand.west ?? '',
    };
  }

  getPlayedCards(): Card[] {
    return this.playedCards;
  }

  getResult(): string {
    return this.hand.result;
  }

  private parseBridgeHand(): { [key in Direction]: Card[] } {
    const [startingDirection, ...hands] = this.hand.deal.split(':');
    const handsArray = hands.join(':').split(' '); // Split individual hands
    const startIndex = Directions.indexOf(startingDirection as Direction);

    if (startIndex === -1 || handsArray.length !== 4) {
      throw new Error('Invalid bridge hand format');
    }

    const orderedHands = Directions.map(
      (_, index) => handsArray[(index - startIndex + 4) % 4],
    );

    return Directions.reduce(
      (acc, direction, index) => {
        const handData = orderedHands[index].split('.');

        acc[direction] = suitOrder.reduce<Card[]>((suitAcc, suit, i) => {
          const cards =
            handData[i]
              ?.split('')
              .map(
                (rank) => ({ suit: suit as Suit, rank: rank as Rank }) as Card,
              ) ?? [];
          return suitAcc.concat(cards); // Ensure the accumulation works properly
        }, []);

        return acc;
      },
      {} as { [key in Direction]: Card[] },
    );
  }

  private findPlayedCards(): Card[] {
    if (this.hand.play) {
      return this.reorderTricks(
        this.hand.play.details
          .filter((trick) => trick !== '*')
          .flatMap((trick) => trick.split(' '))
          .map((it) => ({ rank: it.slice(1), suit: it[0] }) as Card),
        this.hand.play.value as Direction,
      );
    }
    return [];
  }

  private reorderTricks(cards: Card[], firstLeader: Direction): Card[] {
    if (cards.length % 4 !== 0) throw new Error('Invalid trick count!');

    const tricks: Card[][] = [];
    let leaderIndex = Directions.indexOf(firstLeader);

    // Divide the cards into tricks
    for (let i = 0; i < cards.length; i += 4) {
      const trick = cards.slice(i, i + 4);
      tricks.push(trick);

      // Determine the winner's index and update leader for the next trick
      leaderIndex = determineTrickWinner(trick, leaderIndex, this.trumps);
    }

    // Flatten reordered tricks into a single Card[] array
    return tricks.flat();
  }
}
