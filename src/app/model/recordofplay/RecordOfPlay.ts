import { Card, Direction } from '@/app/model/types';

export type RecordOfPlay = {
  contract: string;
  dealer: Direction;
  declarer: Direction;
  deal: { [key in Direction]: Card[] };
  scoreHeadings: string[];
  scores: string[][];
  score: string;
  scoreImp: string;
  nsVulnerable: boolean;
  ewVulnerable: boolean;
  board: number;
  bids: string[] | null;
  opener: Direction;
  trumps: string | null;
  players: { [key in Direction]: string };
  playedCards: Card[];
  result: string;
};
