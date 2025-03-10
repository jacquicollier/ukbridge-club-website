export type ScoreType = 'MP' | 'IMP';

interface BaseScore {
  pairNumber: number;
  players: string[];
}

export interface MPScore extends BaseScore {
  type: 'MP';
  matchPoints: number;
  percentage: number;
}

export interface IMPScore extends BaseScore {
  type: 'IMP';
  imps: number;
}

export type Score = MPScore | IMPScore;
