export type Direction = 'N' | 'E' | 'S' | 'W';

export type Rank =
  | 'A'
  | 'K'
  | 'Q'
  | 'J'
  | 'T'
  | '9'
  | '8'
  | '7'
  | '6'
  | '5'
  | '4'
  | '3'
  | '2';
export type Suit = 'S' | 'H' | 'D' | 'C';

export type Card = {
  rank: Rank;
  suit: Suit;
};

export interface Auction {
  opener: Direction;
  bids: string[];
}

export const NSVulnerableBoards: number[] = [2, 5, 12, 15, 4, 7, 10, 13];
export const EWVulnerableBoards: number[] = [0, 3, 6, 9, 4, 7, 10, 13];

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
