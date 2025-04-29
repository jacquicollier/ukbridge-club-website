import { MasterPointType } from '../types';

export type SessionScoreType = 'PAIR_MP' | 'PAIR_IMP';

interface BaseSessionScore {
  masterPoints?: number;
  masterPointType?: MasterPointType;
  contestant: string;
  names: string[];
  position: string;
}

interface PairScore extends BaseSessionScore {
  direction: string;
}

export interface PairMPSessionScore extends PairScore {
  type: 'PAIR_MP';
  matchPoints: number;
  tops: number;
}

export interface PairIMPSessionScore extends PairScore {
  type: 'PAIR_IMP';
  imps: number;
}

export type SessionScore = PairMPSessionScore | PairIMPSessionScore;
