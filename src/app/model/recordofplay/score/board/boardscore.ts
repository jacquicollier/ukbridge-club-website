import { Direction } from '@/app/model/types';

export type BoardScoreType = 'PAIR_MP' | 'PAIR_IMP';

interface BaseBoardScore {
  players: { [key in Direction]: string };
  contract: string;
  declarer: Direction | null;
  score: string;
  tricks: number | null;
}

export interface PairBoardScore extends BaseBoardScore {
  nsPairNumber: number;
  ewPairNumber: number;
}

export interface PairMPBoardScore extends PairBoardScore {
  type: 'PAIR_MP';
  nsMatchPoints: number;
  ewMatchPoints: number;
}

export interface PairIMPBoardScore extends PairBoardScore {
  type: 'PAIR_IMP';
  imps: number;
}

export type BoardScore = PairMPBoardScore | PairIMPBoardScore;
