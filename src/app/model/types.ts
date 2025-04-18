export type Direction = 'N' | 'E' | 'S' | 'W';
export type PairDirection = 'NS' | 'EW';
export type ContestantDirection = Direction | PairDirection;

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

export type SessionScoreType = 'TWO_WINNER_PAIRS' | 'ONE_WINNER_PAIRS';
export type MasterPointType = 'BLACK' | 'GREEN' | 'BLUE';

export type Result = {
  title: string;
  date: string;
  // realBridgeLink: string | null;
  resultsLink: string;
};
