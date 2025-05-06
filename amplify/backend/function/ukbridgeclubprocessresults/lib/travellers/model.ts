import { IndividualLine, PairIMPLine, PairMPLine } from '../model';

interface BaseTraveller {
  board: number;
  section?: string;
}

export interface PairMPTraveller extends BaseTraveller {
  type: 'PAIR_MP';
  lines: PairMPLine[];
}

export interface PairIMPTraveller extends BaseTraveller {
  type: 'PAIR_IMP';
  lines: PairIMPLine[];
}

export interface IndividualTraveller extends BaseTraveller {
  type: 'INDIVIDUAL';
  lines: IndividualLine[];
}

export interface TeamTraveller extends BaseTraveller {
  type: 'TEAM';
  lines: PairIMPLine[];
}

export type Traveller =
  | PairMPTraveller
  | PairIMPTraveller
  | IndividualTraveller
  | TeamTraveller;
