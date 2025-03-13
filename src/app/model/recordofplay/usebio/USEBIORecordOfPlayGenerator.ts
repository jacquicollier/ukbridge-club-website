import { RecordOfPlayGenerator } from '@/app/model/recordofplay/RecordOfPlayGenerator';
import {
  Hand,
  Usebio,
  UsebioBoard,
} from '@/app/model/recordofplay/usebio/model';
import { Card, Direction } from '../../types';
import { Board, BoardResult, Contestant } from '@/app/model/constants';

export class USEBIORecordOfPlayGenerator extends RecordOfPlayGenerator {
  private usebio: Usebio;

  constructor(usebio: Usebio) {
    super();
    this.usebio = usebio;
  }

  getBoards(): Board[] {
    return this.usebio.EVENT.SESSION.SECTION.BOARD.reduce<Board[]>(
      (acc, board) => {
        acc.push({
          boardNumber: Number(board.BOARD_NUMBER),
          deal: this.createDeal(board),
          results: this.createResults(board),
        });
        return acc;
      },
      [],
    );
  }

  getPlayers(): Map<Contestant, string[]> {
    return this.usebio.EVENT.SESSION.SECTION.PARTICIPANTS.PAIR.reduce(
      (map, pair) => {
        const names = pair.PLAYER.map((it) => it.PLAYER_NAME);
        const contestant: Contestant = {
          id: Number(pair.PAIR_NUMBER),
          direction:
            this.usebio.EVENT.WINNER_TYPE == 2
              ? (pair.DIRECTION as Direction)
              : null,
        };

        map.set(contestant, names);
        return map;
      },
      new Map<Contestant, string[]>(),
    );
  }

  private createDeal(board: UsebioBoard): { [key in Direction]: Card[] } {
    const handSetBoard = this.usebio.HANDSET.BOARD.find(
      (it) => Number(it.BOARD_NUMBER) == board.BOARD_NUMBER,
    );

    const north = handSetBoard?.HAND.find((it) => it.DIRECTION === 'North');
    const south = handSetBoard?.HAND.find((it) => it.DIRECTION === 'South');
    const east = handSetBoard?.HAND.find((it) => it.DIRECTION === 'East');
    const west = handSetBoard?.HAND.find((it) => it.DIRECTION === 'West');

    return {
      N: this.createHand(north!),
      S: this.createHand(south!),
      E: this.createHand(east!),
      W: this.createHand(west!),
    };
  }

  private createResults(board: UsebioBoard): BoardResult[] {
    return board.TRAVELLER_LINE.reduce<BoardResult[]>((acc, travellerLine) => {
      acc.push({
        boardScore: {
          ns: travellerLine.NS_PAIR_NUMBER,
          ew: travellerLine.EW_PAIR_NUMBER,
          lead: travellerLine.LEAD,
          type: 'PAIR_MP',
          contract: travellerLine.CONTRACT ?? '',
          declarer: travellerLine.PLAYED_BY
            ? (travellerLine.PLAYED_BY as Direction)
            : null,
          score: travellerLine.SCORE ?? '',
          tricks: travellerLine.TRICKS ? Number(travellerLine.TRICKS) : 0,
          nsMatchPoints: Number(travellerLine.NS_MATCH_POINTS ?? 0),
          ewMatchPoints: Number(travellerLine.EW_MATCH_POINTS ?? 0),
        },
        auction: null,
        playedCards: null,
      });
      return acc;
    }, []);
  }

  private createHand(hand: Hand): Card[] {
    const spades: Card[] = hand.SPADES.split('').map(
      (it) => ({ suit: 'S', rank: it }) as Card,
    );
    const hearts: Card[] = hand.HEARTS.split('').map(
      (it) => ({ suit: 'H', rank: it }) as Card,
    );
    const diamonds: Card[] = hand.DIAMONDS.split('').map(
      (it) => ({ suit: 'D', rank: it }) as Card,
    );
    const clubs: Card[] = hand.CLUBS.split('').map(
      (it) => ({ suit: 'C', rank: it }) as Card,
    );

    return [...spades, ...hearts, ...diamonds, ...clubs];
  }
}
