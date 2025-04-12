import {
  Card,
  ContestantDirection,
  Direction,
  Rank,
  Suit,
} from '@/app/model/types';
import { BoardScore } from '@/app/api/[club]/results/[date]/[game]/recordofplay/score/board/boardscore';

export const Directions: Direction[] = ['N', 'E', 'S', 'W'];

export const rankOrder: Rank[] = [
  'A',
  'K',
  'Q',
  'J',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
];

export const SuitMap: Record<Suit, string> = {
  S: '♠',
  H: '♥',
  D: '♦',
  C: '♣',
};

export const suitOrder = ['S', 'H', 'D', 'C'];

export const NSVulnerableBoards: number[] = [2, 5, 12, 15, 4, 7, 10, 13];
export const EWVulnerableBoards: number[] = [0, 3, 6, 9, 4, 7, 10, 13];

export interface Contestant {
  id: number;
  direction: ContestantDirection | null;
}

// Note: Doesn't currently handle individual events
export interface HandContestants {
  nsContestant: Contestant;
  ewContestant: Contestant;
}

export interface Auction {
  opener: Direction;
  bids: string[];
}

export interface Board {
  boardNumber: number;
  deal: { [key in Direction]: Card[] };
  results: BoardResult[];
}

export interface BoardResult {
  boardScore: BoardScore;
  auction: Auction | null;
  playedCards: Card[] | null;
}
