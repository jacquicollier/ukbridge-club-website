import { TravellerLine } from '../usebio/model';
import {
  IndividualScoreCardLine,
  PairIMPScoreCardLine,
  PairMPScoreCardLine,
} from './model';
import { Direction } from '../model';

function safeNumber(value: string): number | null {
  const num = Number(value);
  return isNaN(num) ? null : num;
}

export function mapToPairMPScoreCardLine(
  board: number,
  line: TravellerLine,
): PairMPScoreCardLine {
  return {
    board,
    ns: line.NS_PAIR_NUMBER!,
    ew: line.EW_PAIR_NUMBER!,
    contract: line.CONTRACT,
    lead: line.LEAD,
    declarer: line.PLAYED_BY as Direction,
    score: line.SCORE,
    tricks: safeNumber(line.TRICKS),
    nsMatchPoints: Number(line.NS_MATCH_POINTS),
    ewMatchPoints: Number(line.EW_MATCH_POINTS),
  };
}

export function mapToPairIMPScoreCardLine(
  board: number,
  line: TravellerLine,
): PairIMPScoreCardLine {
  return {
    board,
    ns: line.NS_PAIR_NUMBER!,
    ew: line.EW_PAIR_NUMBER!,
    contract: line.CONTRACT,
    lead: line.LEAD,
    declarer: line.PLAYED_BY as Direction,
    score: line.SCORE,
    tricks: safeNumber(line.TRICKS),
    nsCrossImps: Number(line.NS_CROSS_IMP_POINTS),
    ewCrossImps: Number(line.EW_CROSS_IMP_POINTS),
  };
}

export function mapToIndividualScoreCardLine(
  board: number,
  line: TravellerLine,
): IndividualScoreCardLine {
  return {
    board,
    n: line.N_PLAYER_NUMBER!,
    s: line.S_PLAYER_NUMBER!,
    e: line.E_PLAYER_NUMBER!,
    w: line.W_PLAYER_NUMBER!,
    contract: line.CONTRACT,
    lead: line.LEAD,
    declarer: line.PLAYED_BY as Direction,
    score: line.SCORE,
    tricks: safeNumber(line.TRICKS),
    nsMatchPoints: Number(line.NS_MATCH_POINTS),
    ewMatchPoints: Number(line.EW_MATCH_POINTS),
  };
}
