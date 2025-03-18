import { RecordOfPlayGenerator } from '@/app/api/results/[club]/[game]/recordofplay/RecordOfPlayGenerator';
import {
  Hand,
  HandSet,
  Pair,
  Usebio,
  UsebioBoard,
  UsebioSection,
} from '@/app/api/results/[club]/[game]/recordofplay/usebio/model';
import {
  Card,
  Direction,
  Rank,
  SessionScoreType,
  Suit,
} from '@/app/model/types';
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
} from '@/app/api/results/[club]/[game]/recordofplay/score/session/sessionscore';
import { PairMPBoardScore } from '@/app/api/results/[club]/[game]/recordofplay/score/board/boardscore';
import { Section } from '@/app/api/results/[club]/[game]/recordofplay/RecordOfPlay';

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

  getSections(): Section[] {
    if (!this.usebio.EVENT.SESSION) {
      const boards = this.getBoards(this.usebio.EVENT.BOARD!);
      const pairs = this.usebio.EVENT.PARTICIPANTS?.PAIR ?? [];

      return [
        {
          name: '',
          boards: boards,
          sessionScores: this.getSessionScores(boards, pairs),
          players: this.getPlayers(pairs),
        },
      ];
    }
    if (Array.isArray(this.usebio.EVENT.SESSION.SECTION)) {
      const sections = this.usebio.EVENT.SESSION.SECTION.map((section) => {
        const boards = this.getBoards(this.findBoards(section));
        const pairs = this.findPairs(section);

        return {
          name: section.$.SECTION_ID,
          boards: boards,
          sessionScores: this.getSessionScores(boards, pairs),
          players: this.getPlayers(this.findPairs(section)),
        };
      });

      if (this.usebio.EVENT.WINNER_TYPE == 1) {
        const playersMap = sections.reduce<Map<Contestant, string[]>>(
          (acc, section) => {
            section.players.entries().forEach((contestant) => {
              acc.set(contestant[0], contestant[1]);
            });
            return acc;
          },
          new Map(),
        );

        return [
          {
            name: '',
            boards: this.combineBoards(
              sections.flatMap((section) => section.boards),
            ),
            sessionScores: sections.reduce<SessionScore[]>(
              (acc, section) => acc.concat(section.sessionScores),
              [],
            ),
            players: playersMap,
          },
        ];
      }
      return sections;
    } else {
      const boards = this.getBoards(
        this.findBoards(this.usebio.EVENT.SESSION.SECTION),
      );
      const pairs = this.findPairs(this.usebio.EVENT.SESSION.SECTION);

      return [
        {
          name: '',
          boards: boards,
          sessionScores: this.getSessionScores(boards, pairs),
          players: this.getPlayers(pairs),
        },
      ];
    }
  }

  private combineBoards(boards: Board[]): Board[] {
    // Create a map to store the combined results by boardNumber
    const boardMap = new Map<number, Board>();

    boards.forEach((board) => {
      // If the board number doesn't exist in the map, add it
      if (!boardMap.has(board.boardNumber)) {
        boardMap.set(board.boardNumber, {
          boardNumber: board.boardNumber,
          deal: board.deal,
          results: board.results,
        });
      } else {
        // If the board number exists, merge the results
        const existingBoard = boardMap.get(board.boardNumber);
        if (existingBoard) {
          existingBoard.results = [...existingBoard.results, ...board.results];
        }
      }
    });

    // Return an array of boards with combined results
    return Array.from(boardMap.values());
  }

  private getBoards(boards: UsebioBoard[]): Board[] {
    return boards.reduce<Board[]>((acc, board) => {
      acc.push({
        boardNumber: Number(board.BOARD_NUMBER),
        deal: this.createDeal(board),
        results: this.createResults(board),
      });
      return acc;
    }, []);
  }

  private getPlayers(pairs: Pair[]): Map<Contestant, string[]> {
    return pairs.reduce((map, pair) => {
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

  private getSessionScores(boards: Board[], pairs: Pair[]): SessionScore[] {
    return pairs.reduce<SessionScore[]>((acc, pair) => {
      acc.push({
        type: 'PAIR_MP',
        position: pair.PLACE,
        masterPoints: pair.MASTER_POINTS?.MASTER_POINTS_AWARDED,
        masterPointType: pair.MASTER_POINTS?.MASTER_POINT_TYPE,
        contestant: pair.PAIR_NUMBER,
        direction: pair.DIRECTION as Direction,
        names: pair.PLAYER.map((it) => it.PLAYER_NAME),
        matchPoints: Number(
          this.calculateContestantMP(boards, pair).toFixed(2),
        ),
        tops: Number(this.calculateTops(boards, pair).toFixed(0)),
      } as PairMPSessionScore);
      return acc;
    }, []);
  }

  private calculateTops(boards: Board[], pair: Pair): number {
    return boards.reduce(
      (acc, board) =>
        acc + this.getTotalMatchPoints(this.findBoardResult(pair, board)),
      0,
    );
  }

  private calculateContestantMP(boards: Board[], pair: Pair): number {
    return boards.reduce(
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
      return this.createDealFromHandset(this.usebio.HANDSET, board);
    } else if (this.usebio.EVENT.SESSION?.HANDSET) {
      return this.createDealFromHandset(
        this.usebio.EVENT.SESSION.HANDSET,
        board,
      );
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

  private createDealFromHandset(
    handset: HandSet,
    board: UsebioBoard,
  ): { [key in Direction]: Card[] } {
    const handSetBoard = handset.BOARD.find(
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

  private findBoards(section: UsebioSection): UsebioBoard[] {
    if (this.usebio.EVENT.BOARD) {
      return this.usebio.EVENT.BOARD;
    }
    return section.BOARD;
  }

  private findPairs(section: UsebioSection): Pair[] {
    if (this.usebio.EVENT.PARTICIPANTS) {
      return this.usebio.EVENT.PARTICIPANTS.PAIR;
    }
    return section.PARTICIPANTS.PAIR;
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
