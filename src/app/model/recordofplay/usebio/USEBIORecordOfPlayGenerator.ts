import { RecordOfPlayGenerator } from '@/app/model/recordofplay/RecordOfPlayGenerator';
import {
  Board,
  Hand,
  HandSet,
  Participants,
  TravellerLine,
  Event,
} from '@/app/model/recordofplay/usebio/model';
import { Direction, Card, ContestantDirection } from '../../types';
import { determineTrumps } from '@/app/model/recordofplay/utils';
import {
  BoardScore,
  PairMPBoardScore,
} from '@/app/model/recordofplay/score/board/boardscore';
import {
  Auction,
  HandContestants,
  Player,
  Result,
} from '@/app/model/constants';

export class USEBIORecordOfPlayGenerator extends RecordOfPlayGenerator {
  private event: Event;
  private board: Board;
  private participants: Participants;
  private handSet: HandSet;

  constructor(
    event: Event,
    board: Board,
    participants: Participants,
    handSet: HandSet,
  ) {
    super();
    this.event = event;
    this.board = board;
    this.participants = participants;
    this.handSet = handSet;
  }

  getBoard(): number {
    return this.board.BOARD_NUMBER;
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

  getPlay(): Map<HandContestants, Result> {
    return this.board.TRAVELLER_LINE.reduce((map, travellerLine) => {
      const contestants: HandContestants = {
        nsContestant: {
          id: Number(travellerLine.NS_PAIR_NUMBER),
          direction:
            this.event.WINNER_TYPE == 2 ? ('NS' as ContestantDirection) : null,
        },
        ewContestant: {
          id: Number(travellerLine.EW_PAIR_NUMBER),
          direction:
            this.event.WINNER_TYPE == 2 ? ('EW' as ContestantDirection) : null,
        },
      };

      const result: Result = {
        boardScore: {
          type: 'PAIR_MP',
          players: this.getPlayers(travellerLine),
          contract: travellerLine.CONTRACT ?? '',
          declarer: travellerLine.PLAYED_BY
            ? (travellerLine.PLAYED_BY as Direction)
            : null,
          score: travellerLine.SCORE ?? '',
          tricks: travellerLine.TRICKS ? Number(travellerLine.TRICKS) : 0,
          nsPairNumber: Number(travellerLine.NS_PAIR_NUMBER ?? 0),
          ewPairNumber: Number(travellerLine.EW_PAIR_NUMBER ?? 0),
          nsMatchPoints: Number(travellerLine.NS_MATCH_POINTS ?? 0),
          ewMatchPoints: Number(travellerLine.EW_MATCH_POINTS ?? 0),
        },
        auction: null,
        playedCards: null,
      };

      map.set(contestants, result);
      return map;
    }, new Map<HandContestants, Result>());
  }

  getPlayers(): Map<Player, string> {
    return new Map();
  }

  getPlayedCards(): Card[] {
    return [];
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

  getBoardScores(): BoardScore[] {
    const scores: PairMPBoardScore[] = this.board.TRAVELLER_LINE.map(
      (travellerLine) => {
        return {
          type: 'PAIR_MP',
          players: this.getPlayers(travellerLine),
          contract: travellerLine.CONTRACT ?? '',
          declarer: travellerLine.PLAYED_BY
            ? (travellerLine.PLAYED_BY as Direction)
            : null,
          score: travellerLine.SCORE ?? '',
          tricks: travellerLine.TRICKS ? Number(travellerLine.TRICKS) : 0,
          nsPairNumber: Number(travellerLine.NS_PAIR_NUMBER ?? 0),
          ewPairNumber: Number(travellerLine.EW_PAIR_NUMBER ?? 0),
          nsMatchPoints: Number(travellerLine.NS_MATCH_POINTS ?? 0),
          ewMatchPoints: Number(travellerLine.EW_MATCH_POINTS ?? 0),
        };
      },
    );

    return scores;
  }

  // Not in USEBIO file
  getBids(): string[] | null {
    return [];
  }

  // Not in USEBIO - prob same as Dealer but not necessarily
  getOpener(): Direction {
    return 'N';
  }

  private getPlayers(travellerLine: TravellerLine): {
    [key in Direction]: string;
  } {
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
