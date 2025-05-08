import { Card } from '@/app/components/hand/board/model';

export type Direction = 'N' | 'E' | 'S' | 'W';

export interface Board {
  boardNumber: number;
  deal: { [key in Direction]: Card[] };
}

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

interface BaseScoreCard {
  contestant: string;
  section?: string;
}

export interface ScoreCardLine {
  board: number;
  auction?: string;
  play?: string;
}

export interface PairMPScoreCardLine extends PairMPLine, ScoreCardLine {}

export interface PairIMPScoreCardLine extends PairIMPLine, ScoreCardLine {}

export interface IndividualScoreCardLine
  extends IndividualLine,
    ScoreCardLine {}

export interface PairMPScoreCard extends BaseScoreCard {
  type: 'PAIR_MP';
  lines: PairMPScoreCardLine[];
}

export interface PairIMPScoreCard extends BaseScoreCard {
  type: 'PAIR_IMP';
  lines: PairIMPScoreCardLine[];
}

export interface IndividualScoreCard extends BaseScoreCard {
  type: 'INDIVIDUAL';
  lines: IndividualScoreCardLine[];
}

export interface TeamScoreCard extends BaseScoreCard {
  type: 'TEAM';
  lines: PairIMPScoreCardLine[];
}

export type ScoreCard =
  | PairMPScoreCard
  | PairIMPScoreCard
  | IndividualScoreCard
  | TeamScoreCard;

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
