type MasterPointType = 'BLACK' | 'GREEN' | 'BLUE';

interface BaseSessionScore {
  masterPoints?: number;
  masterPointType?: MasterPointType;
  contestant: string;
  position: string; // string to handle e.g., 7= for two contestants with the same score
}

export interface PairMPSessionScore extends BaseSessionScore {
  type: 'PAIR_MP';
  matchPoints: number;
  tops: number;
}

export interface PairIMPSessionScore extends BaseSessionScore {
  type: 'PAIR_IMP';
  imps: number;
}

export type Model = PairMPSessionScore | PairIMPSessionScore;

export interface SectionSessionScores {
  name: string;
  sessionScores: Model[];
}
