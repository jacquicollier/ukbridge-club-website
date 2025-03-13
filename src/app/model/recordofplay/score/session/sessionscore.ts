import { Direction } from '@/app/model/types';

export type SessionScoreType = 'PAIR_MP' | 'PAIR_IMP';

interface BaseSessionScore {
  players: { [key in Direction]: string };
  position: number;
  masterPoints?: number;
}

interface PairScore extends BaseSessionScore {
  pairNumber: string;
  direction: string;
}

export interface PairMPSessionScore extends PairScore {
  type: 'PAIR_MP';
  matchPoints: number;
  tops: number;
  percentage: number;
}

export interface PairIMPSessionScore extends PairScore {
  type: 'PAIR_IMP';
  imps: number;
}

export type SessionScore = PairMPSessionScore | PairIMPSessionScore;
