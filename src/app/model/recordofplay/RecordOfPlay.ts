import { Card, Direction } from '@/app/model/types';
import { Score } from '@/app/model/recordofplay/score';

export type RecordOfPlay = {
  contract: string;
  dealer: Direction;
  declarer: Direction;
  deal: { [key in Direction]: Card[] };
  scores: Score[];
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
