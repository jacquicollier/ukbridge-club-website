import { RecordOfPlayGenerator } from '@/app/model/recordofplay/RecordOfPlayGenerator';
import {
  Hand,
  Pair,
  Usebio,
  UsebioBoard,
} from '@/app/model/recordofplay/usebio/model';
import { Card, Direction, Rank, SessionScoreType, Suit } from '../../types';
import {
  Board,
  BoardResult,
  Contestant,
  rankOrder,
  suitOrder,
} from '@/app/model/constants';
import {
  PairMPSessionScore,
  SessionScore,
} from '@/app/model/recordofplay/score/session/sessionscore';
import { PairMPBoardScore } from '@/app/model/recordofplay/score/board/boardscore';

export class USEBIORecordOfPlayGenerator extends RecordOfPlayGenerator {
  private usebio: Usebio;

  constructor(usebio: Usebio) {
    super();
    this.usebio = usebio;
  }

  getSessionScoreType(): SessionScoreType {
    if (this.usebio.EVENT.WINNER_TYPE == 2) {
      return 'TWO_WINNER_PAIRS';
    }
    return 'ONE_WINNER_PAIRS';
  }

  getBoards(): Board[] {
    return this.findBoards().reduce<Board[]>((acc, board) => {
      acc.push({
        boardNumber: Number(board.BOARD_NUMBER),
        deal: this.createDeal(board),
        results: this.createResults(board),
      });
      return acc;
    }, []);
  }

  getPlayers(): Map<Contestant, string[]> {
    return this.findPairs().reduce((map, pair) => {
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
    }, new Map<Contestant, string[]>());
  }

  getSessionScores(): SessionScore[] {
    return this.findPairs().reduce<SessionScore[]>((acc, pair) => {
      acc.push({
        type: 'PAIR_MP',
        position: Number(pair.PLACE),
        masterPoints: pair.MASTER_POINTS?.MASTER_POINTS_AWARDED,
        masterPointType: pair.MASTER_POINTS?.MASTER_POINT_TYPE,
        contestant: pair.PAIR_NUMBER,
        direction: pair.DIRECTION as Direction,
        names: pair.PLAYER.map((it) => it.PLAYER_NAME),
        matchPoints: this.calculateContestantMP(pair),
        tops: this.calculateTops(pair),
      } as PairMPSessionScore);
      return acc;
    }, []);
  }

  private calculateTops(pair: Pair): number {
    return this.getBoards().reduce(
      (acc, board) =>
        acc + this.getTotalMatchPoints(this.findBoardResult(pair, board)),
      0,
    );
  }

  private calculateContestantMP(pair: Pair): number {
    return this.getBoards().reduce(
      (acc, board) =>
        acc +
        this.getMatchPointsForPair(pair, this.findBoardResult(pair, board)),
      0,
    );
  }

  private getTotalMatchPoints(boardResult?: BoardResult): number {
    if (!boardResult) return 0;
    const { nsMatchPoints, ewMatchPoints } =
      boardResult.boardScore as PairMPBoardScore;
    return nsMatchPoints + ewMatchPoints;
  }

  private getMatchPointsForPair(pair: Pair, boardResult?: BoardResult): number {
    if (!boardResult) return 0;
    const { nsMatchPoints, ewMatchPoints, ns } =
      boardResult.boardScore as PairMPBoardScore;

    if (pair.DIRECTION) {
      return pair.DIRECTION === 'NS' ? nsMatchPoints : ewMatchPoints;
    }

    return pair.PAIR_NUMBER === ns ? nsMatchPoints : ewMatchPoints;
  }

  private findBoardResult(pair: Pair, board: Board): BoardResult | undefined {
    return board.results.find((it) =>
      pair.DIRECTION
        ? pair.PAIR_NUMBER ===
          (pair.DIRECTION === 'NS' ? it.boardScore.ns : it.boardScore.ew)
        : pair.PAIR_NUMBER === it.boardScore.ns ||
          pair.PAIR_NUMBER === it.boardScore.ew,
    );
  }

  private createDeal(board: UsebioBoard): { [key in Direction]: Card[] } {
    if (this.usebio.HANDSET) {
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
    } else if (board.TRAVELLER_LINE[0].LIN_DATA) {
      const linData = this.extractLINValues(board.TRAVELLER_LINE[0].LIN_DATA);
      if (linData.md.length > 0) {
        const directions: Direction[] = ['S', 'W', 'N', 'E'];
        const hands: { [key in Direction]: Card[] } = {
          N: [],
          E: [],
          S: [],
          W: [],
        };

        // Decode percent-encoded characters
        const decodedMd = decodeURIComponent(linData.md[0]);

        // Extract the hands data
        const cardData = decodedMd.split(',');

        if (cardData.length !== 3 && cardData.length !== 4) {
          throw new Error('Invalid md format - Expected 3 or 4 hands');
        }

        cardData.forEach((hand, index) => {
          const direction = directions[index]; // Map to "S", "W", "N", "E"
          if (!hand) return; // Handle empty hands

          let currentSuit: Suit | null = null;

          for (const char of hand) {
            if ('SHDC'.includes(char)) {
              currentSuit = char as Suit;
            } else if (currentSuit) {
              hands[direction].push({ suit: currentSuit, rank: char as Rank });
            }
          }
        });

        hands.E = this.findMissingCards(hands);

        return hands;
      }
    }
    return { N: [], W: [], S: [], E: [] };
  }

  // Function to get all missing cards and assign them to East
  private findMissingCards(hands: { [key in Direction]: Card[] }): Card[] {
    // Generate all possible 52 cards
    const allCards: Card[] = suitOrder.flatMap((suit) =>
      rankOrder.map((rank) => ({ suit, rank }) as Card),
    );

    // Get all assigned cards from S, W, N
    const assignedCards = new Set(
      hands.S.concat(hands.W, hands.N).map(
        (card) => `${card.suit}${card.rank}`,
      ),
    );

    // Find unassigned cards
    return allCards.filter(
      (card) => !assignedCards.has(`${card.suit}${card.rank}`),
    ); // Assign missing cards to East
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

  private findBoards(): UsebioBoard[] {
    if (this.usebio.EVENT.BOARD) {
      return this.usebio.EVENT.BOARD;
    }
    if (Array.isArray(this.usebio.EVENT.SESSION.SECTION)) {
      return this.usebio.EVENT.SESSION.SECTION[0].BOARD;
    } else {
      return this.usebio.EVENT.SESSION.SECTION.BOARD;
    }
  }

  private findPairs(): Pair[] {
    if (this.usebio.EVENT.PARTICIPANTS) {
      return this.usebio.EVENT.PARTICIPANTS.PAIR;
    }
    if (Array.isArray(this.usebio.EVENT.SESSION.SECTION)) {
      return this.usebio.EVENT.SESSION.SECTION[0].PARTICIPANTS.PAIR;
    } else {
      return this.usebio.EVENT.SESSION.SECTION.PARTICIPANTS.PAIR;
    }
  }

  private extractLINValues(linString: string) {
    const linParts = linString.split('|');
    const result: { md: string[]; mb: string[]; pc: string[] } = {
      md: [],
      mb: [],
      pc: [],
    };

    for (let i = 0; i < linParts.length; i += 2) {
      const key = linParts[i];
      const value = linParts[i + 1];

      if (key && value) {
        if (key === 'md') result.md.push(value);
        else if (key === 'mb') result.mb.push(value);
        else if (key === 'pc') result.pc.push(value);
      }
    }

    return result;
  }
}
