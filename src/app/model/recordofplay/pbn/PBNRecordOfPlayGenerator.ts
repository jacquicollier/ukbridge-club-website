import { RecordOfPlayGenerator } from '@/app/model/recordofplay/RecordOfPlayGenerator';
import { Hand } from '@/app/model/recordofplay/pbn/hand';
import { Card, Direction, Rank, Suit } from '@/app/model/types';
import {
  Board,
  Contestant,
  Directions,
  suitOrder,
} from '@/app/model/constants';
import {
  determineTrickWinner,
  determineTrumps,
} from '@/app/model/recordofplay/utils';

export class PBNRecordOfPlayGenerator extends RecordOfPlayGenerator {
  getBoards(): Board[] {
    throw new Error('Method not implemented.');
  }
  private readonly hands: Hand[];
  // private readonly deal: { [key in Direction]: Card[] };
  // private readonly trumps: string | null;
  // private readonly playedCards: Card[];

  constructor(hands: Hand[]) {
    super();
    this.hands = hands;
    // this.deal = this.parseBridgeHand();
    // this.trumps = determineTrumps(hand.contract);
    // this.playedCards = this.findPlayedCards();
  }

  // getBoards(): Board[] {
  //   return this.hands.reduce((acc, hand) => {});
  // }

  getPlayers(): Map<Contestant, string[]> {
    throw new Error('Method not implemented.');
  }

  // getBoard(): number {
  //   throw new Error('Method not implemented.');
  // }
  //
  // getDeal(): { [key in Direction]: Card[]; } {
  //   throw new Error('Method not implemented.');
  // }
  //
  // getPlay(): Map<HandContestants, Result> {
  //   throw new Error('Method not implemented.');
  // }
  //
  // getPlayers(): Map<Contestant, string[]> {
  //   throw new Error('Method not implemented.');
  // }

  // getContract(): string {
  //   return this.hand.contract;
  // }
  //
  // getDeclarer(): Direction {
  //   return this.hand.declarer as Direction;
  // }
  //
  // getDeal(): { [key in Direction]: Card[] } {
  //   return this.deal;
  // }
  //
  // getScores(): BoardScore[] {
  //   if (this.hand.scoretable) {
  //     return this.hand.scoretable!.details.map((it) => it.trim().split(/\s+/));
  //   }
  //   return [];
  // }
  //
  // getScore(): string {
  //   return this.hand.score ?? '';
  // }
  //
  // getScoreImp(): string {
  //   return this.hand.scoreimp ?? '';
  // }
  //
  // getBoard(): number {
  //   return Number(this.hand.board);
  // }
  //
  // getBids(): string[] | null {
  //   return this.hand.auction.details.flatMap((line) => line.split(' '));
  // }
  //
  // getOpener(): Direction {
  //   return this.hand.auction.value as Direction;
  // }
  //
  // getPlayers(): { [key in Direction]: string } {
  //   return {
  //     N: this.hand.north ?? '',
  //     E: this.hand.east ?? '',
  //     S: this.hand.south ?? '',
  //     W: this.hand.west ?? '',
  //   };
  // }
  //
  // getPlayedCards(): Card[] {
  //   return this.playedCards;
  // }
  //
  // getResult(): string {
  //   return this.hand.result;
  // }

  private parseBridgeHand(hand: Hand): { [key in Direction]: Card[] } {
    const [startingDirection, ...hands] = hand.deal.split(':');
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

  private findPlayedCards(hand: Hand): Card[] {
    if (hand.play) {
      return this.reorderTricks(
        hand.play.details
          .filter((trick) => trick !== '*')
          .flatMap((trick) => trick.split(' '))
          .map((it) => ({ rank: it.slice(1), suit: it[0] }) as Card),
        hand.play.value as Direction,
        hand,
      );
    }
    return [];
  }

  private reorderTricks(
    cards: Card[],
    firstLeader: Direction,
    hand: Hand,
  ): Card[] {
    if (cards.length % 4 !== 0) throw new Error('Invalid trick count!');

    const tricks: Card[][] = [];
    let leaderIndex = Directions.indexOf(firstLeader);

    // Divide the cards into tricks
    for (let i = 0; i < cards.length; i += 4) {
      const trick = cards.slice(i, i + 4);
      tricks.push(trick);

      // Determine the winner's index and update leader for the next trick
      leaderIndex = determineTrickWinner(
        trick,
        leaderIndex,
        determineTrumps(hand.contract),
      );
    }

    // Flatten reordered tricks into a single Card[] array
    return tricks.flat();
  }
}
