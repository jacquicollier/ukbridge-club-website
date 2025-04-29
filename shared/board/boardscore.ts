import { Direction } from '../types';

export type BoardScoreType = 'PAIR_MP' | 'PAIR_IMP';

interface BaseBoardScore {
  ns: string;
  ew: string;
  contract: string;
  lead: string;
  declarer: Direction | null;
  score: string;
  tricks: number | null;
}

export interface PairMPBoardScore extends BaseBoardScore {
  type: 'PAIR_MP';
  nsMatchPoints: number;
  ewMatchPoints: number;
}

export interface PairIMPBoardScore extends BaseBoardScore {
  type: 'PAIR_IMP';
  imps: number;
}

export type BoardScore = PairMPBoardScore | PairIMPBoardScore;
