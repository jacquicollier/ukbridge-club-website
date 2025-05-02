import { Direction } from '../boards/model';

interface BaseTravellerLine {
  contract: string | null;
  lead: string | null;
  declarer: Direction | null;
  score: string;
  tricks: number | null;
}

interface PairTravellerLine extends BaseTravellerLine {
  ns: string;
  ew: string;
}

export interface PairMPTravellerLine extends PairTravellerLine {
  nsMatchPoints: number;
  ewMatchPoints: number;
}

export interface PairIMPTravellerLine extends PairTravellerLine {
  nsCrossImps: number;
  ewCrossImps: number;
}

export interface IndividualTravellerLine extends BaseTravellerLine {
  n: string;
  s: string;
  e: string;
  w: string;
  nsMatchPoints: number;
  ewMatchPoints: number;
}

interface BaseTraveller {
  board: number;
  section?: string;
}

export interface PairMPTraveller extends BaseTraveller {
  type: 'PAIR_MP';
  lines: PairMPTravellerLine[];
}

export interface PairIMPTraveller extends BaseTraveller {
  type: 'PAIR_IMP';
  lines: PairIMPTravellerLine[];
}

export interface IndividualTraveller extends BaseTraveller {
  type: 'INDIVIDUAL';
  lines: IndividualTravellerLine[];
}

export interface TeamTraveller extends BaseTraveller {
  type: 'TEAM';
  lines: PairIMPTravellerLine[];
}

export type Traveller =
  | PairMPTraveller
  | PairIMPTraveller
  | IndividualTraveller
  | TeamTraveller;
