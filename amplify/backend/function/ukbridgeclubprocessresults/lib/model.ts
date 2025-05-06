import { Direction } from './boards/model';

export interface BaseLine {
  contract: string | null;
  lead: string | null;
  declarer: Direction | null;
  score: string;
  tricks: number | null;
}

export interface PairLine extends BaseLine {
  ns: string;
  ew: string;
}

export interface PairMPLine extends PairLine {
  nsMatchPoints: number;
  ewMatchPoints: number;
}

export interface PairIMPLine extends PairLine {
  nsCrossImps: number;
  ewCrossImps: number;
}

export interface IndividualLine extends BaseLine {
  n: string;
  s: string;
  e: string;
  w: string;
  nsMatchPoints: number;
  ewMatchPoints: number;
}
