import {
  Match,
  TravellerLine,
  UsebioBoard,
  UsebioSection,
} from '../usebio/model';
import { IndividualTraveller, TeamTraveller, Traveller } from './model';
import {
  mapToIndividualLine,
  mapToPairIMPLine,
  mapToPairMPLine,
} from './utils';
import { PairIMPLine } from '../model';

export function generatePairsTravellerForBoard(
  scoringMethod: string,
  section: UsebioSection | null,
  board: UsebioBoard,
): Traveller {
  const isMP = scoringMethod === 'MATCH_POINTS' || scoringMethod === 'MP_PAIRS';
  const lines = board.TRAVELLER_LINE.map((line) =>
    isMP ? mapToPairMPLine(line) : mapToPairIMPLine(line),
  );

  return {
    type: isMP ? 'PAIR_MP' : 'PAIR_IMP',
    board: board.BOARD_NUMBER,
    section: section?.$.SECTION_ID,
    lines,
  } as Traveller;
}

export function generatePairsTravellerForSection(
  scoringMethod: string,
  section: UsebioSection,
): Traveller[] {
  return section.BOARD.map((board) =>
    generatePairsTravellerForBoard(scoringMethod, section, board),
  );
}

export function generateIndividualTravellerForBoard(
  board: UsebioBoard,
): IndividualTraveller {
  return {
    type: 'INDIVIDUAL',
    board: board.BOARD_NUMBER,
    lines: board.TRAVELLER_LINE.map(mapToIndividualLine),
  };
}

export function generateTeamsTravellerForMatch(match: Match): TeamTraveller[] {
  const boardMap = new Map<number, TravellerLine[]>();

  match.BOARD.forEach((board) => {
    const current = boardMap.get(board.BOARD_NUMBER) ?? [];
    boardMap.set(board.BOARD_NUMBER, [...current, ...board.TRAVELLER_LINE]);
  });

  return Array.from(boardMap.entries()).map(([boardNumber, lines]) => ({
    type: 'TEAM',
    board: boardNumber,
    lines: lines.map(mapToPairIMPLine),
  }));
}

export function mergeTravellerPayload(
  payload: TeamTraveller[],
): TeamTraveller[] {
  const boardMap = new Map<number, PairIMPLine[]>();

  payload.forEach(({ board, lines }) => {
    const current = boardMap.get(board) ?? [];
    boardMap.set(board, [...current, ...lines]);
  });

  return Array.from(boardMap.entries()).map(([board, lines]) => ({
    type: 'TEAM',
    board,
    lines,
  }));
}
