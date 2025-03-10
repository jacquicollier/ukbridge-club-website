import { RecordOfPlayGenerator } from '@/app/model/recordofplay/RecordOfPlayGenerator';
import {
  Board,
  Hand,
  HandSet,
  Participants,
  TravellerLine,
} from '@/app/model/recordofplay/usebio/model';
import { Direction, Card } from '../../types';
import { determineTrumps } from '@/app/model/recordofplay/utils';

export class USEBIORecordOfPlayGenerator extends RecordOfPlayGenerator {
  private board: Board;
  private pairNumber: string;
  private pairDirection: string;
  private participants: Participants;
  private handSet: HandSet;

  private travellerLine?: TravellerLine;

  constructor(
    board: Board,
    pairNumber: string,
    pairDirection: string,
    participants: Participants,
    handSet: HandSet,
  ) {
    super();
    this.board = board;
    this.pairNumber = pairNumber;
    this.pairDirection = pairDirection;
    this.participants = participants;
    this.handSet = handSet;

    this.travellerLine = this.findTravellerLine();
  }

  getScoreImp(): string {
    return '';
  }

  getTrumps(): string | null {
    const travellerLine = this.travellerLine;
    return travellerLine ? determineTrumps(travellerLine.CONTRACT) : null;
  }

  getPlayers(): { [key in Direction]: string } {
    const travellerLine = this.travellerLine;

    const nsPair = this.participants.PAIR.find(
      (it) =>
        it.PAIR_NUMBER === travellerLine?.NS_PAIR_NUMBER &&
        it.DIRECTION === 'NS',
    );
    const ewPair = this.participants.PAIR.find(
      (it) =>
        it.PAIR_NUMBER === travellerLine?.EW_PAIR_NUMBER &&
        it.DIRECTION === 'EW',
    );

    return {
      N: nsPair?.PLAYER[0]?.PLAYER_NAME ?? '',
      S: nsPair?.PLAYER[1]?.PLAYER_NAME ?? '',
      E: ewPair?.PLAYER[0]?.PLAYER_NAME ?? '',
      W: ewPair?.PLAYER[1]?.PLAYER_NAME ?? '',
    };
  }

  getPlayedCards(): Card[] {
    return [];
  }

  getContract(): string {
    return this.travellerLine?.CONTRACT ?? '';
  }

  // Note: USEBIO file doesn't contain this - should be able to calculate from the board number though.
  getDealer(): Direction {
    return 'N';
  }

  getDeclarer(): Direction {
    return this.travellerLine?.PLAYED_BY as Direction;
  }

  getDeal(): { [key in Direction]: Card[] } {
    const handSetBoard = this.handSet.BOARD.find(
      (it) => Number(it.BOARD_NUMBER) == this.board.BOARD_NUMBER,
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

  getScoreHeadings(): string[] {
    return [
      'NS',
      'EW',
      'Contract',
      'Declarer',
      'Lead',
      'Tricks',
      'Score',
      'NS MP',
      'EW MP',
    ];
  }

  getScores(): string[][] {
    return this.board.TRAVELLER_LINE.map((it) => {
      return [
        it.NS_PAIR_NUMBER,
        it.EW_PAIR_NUMBER,
        it.CONTRACT,
        it.PLAYED_BY,
        it.LEAD,
        it.TRICKS,
        it.SCORE,
        it.NS_MATCH_POINTS,
        it.EW_MATCH_POINTS,
      ];
    });
  }

  getScore(): string {
    return 'NS ' + (this.travellerLine?.SCORE ?? '');
  }

  // Note: USEBIO file doesn't contain this - should be able to calculate from the board number though.
  getNsVulnerable(): boolean {
    return true;
  }

  // Note: USEBIO file doesn't contain this - should be able to calculate from the board number though.
  getEwVulnerable(): boolean {
    return false;
  }

  getBoard(): number {
    return this.board.BOARD_NUMBER;
  }

  // Not in USEBIO file
  getBids(): string[] | null {
    return [];
  }

  // Not in USEBIO - prob same as Dealer but not necessarily
  getOpener(): Direction {
    return 'N';
  }

  getResult(): string {
    return this.travellerLine?.TRICKS ?? '';
  }

  private findTravellerLine() {
    return this.board.TRAVELLER_LINE.find(
      (it) =>
        (this.pairDirection == 'NS' && it.NS_PAIR_NUMBER == this.pairNumber) ||
        (this.pairDirection == 'EW' && it.EW_PAIR_NUMBER == this.pairNumber) ||
        (this.pairDirection === null &&
          (it.EW_PAIR_NUMBER == this.pairNumber ||
            it.NS_PAIR_NUMBER == this.pairNumber)),
    );
  }
}
