import { IndividualLine, PairIMPLine, PairMPLine } from '../model';

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
