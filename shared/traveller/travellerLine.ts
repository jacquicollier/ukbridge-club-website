import { Direction } from '../types';

interface BaseTravellerLine {
  ns: string;
  ew: string;
  contract: string;
  lead: string | null;
  declarer: Direction | null;
  score: string;
  tricks: number | null;
}

export interface PairMPTravellerLine extends BaseTravellerLine {
  type: 'PAIR_MP';
  nsMatchPoints: number;
  ewMatchPoints: number;
}

export interface PairIMPTravellerLine extends BaseTravellerLine {
  type: 'PAIR_IMP';
  imps: number;
}

export type TravellerLine = PairMPTravellerLine | PairIMPTravellerLine;
