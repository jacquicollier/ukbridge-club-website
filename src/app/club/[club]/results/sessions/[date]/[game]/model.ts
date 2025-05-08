type MasterPointType = 'BLACK' | 'GREEN' | 'BLUE';

interface BaseSessionScoreLine {
  masterPoints?: number;
  masterPointType?: MasterPointType;
  position: string; // string to handle e.g., 7= for two contestants with the same score
}

interface BaseContestantSessionScoreLine extends BaseSessionScoreLine {
  contestant: string;
}

interface BaseSessionScore {
  section?: string;
}

export interface PairMPSessionScoreLine extends BaseContestantSessionScoreLine {
  percentage: number;
}

export interface PairMPSessionScore extends BaseSessionScore {
  type: 'PAIR_MP';
  lines: PairMPSessionScoreLine[];
}

export interface PairIMPSessionScoreLine
  extends BaseContestantSessionScoreLine {
  imps: number;
}

export interface PairIMPSessionScore extends BaseSessionScore {
  type: 'PAIR_IMP';
  lines: PairIMPSessionScoreLine[];
}

export interface IndividualSessionScoreLine
  extends BaseContestantSessionScoreLine {
  percentage: number;
}

export interface IndividualSessionScore extends BaseSessionScore {
  type: 'INDIVIDUAL';
  lines: IndividualSessionScoreLine[];
}

export interface TeamsSessionScoreLine extends BaseSessionScoreLine {
  imps: number;
  pairs: TeamPairScoreLine[];
}

export interface TeamPairScoreLine {
  contestant: string;
  imps: number;
  boardsPlayed: number;
}

export interface TeamsSessionScore extends BaseSessionScore {
  type: 'TEAM';
  lines: TeamsSessionScoreLine[];
}

export type SessionScore =
  | PairMPSessionScore
  | PairIMPSessionScore
  | IndividualSessionScore
  | TeamsSessionScore;

export interface Contestant {
  section: string | null;
  id: string;
  names: string[];
}
