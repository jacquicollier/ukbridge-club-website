import { PBNHand } from 'lib/pbn/model';
import {
  Match,
  TravellerLine,
  UsebioBoard,
  UsebioFile,
  UsebioSection,
} from 'lib/usebio/model';
import {
  IndividualScoreCard,
  PairIMPScoreCard,
  PairMPScoreCard,
  ScoreCard,
  ScoreCardLine,
  TeamScoreCard,
} from './model';
import {
  mapToIndividualScoreCardLine,
  mapToPairIMPScoreCardLine,
  mapToPairMPScoreCardLine,
} from './utils';

/**
 * Entry point for generating scorecards from a USEBIO file.
 */
export function generateScoreCards(
  usebioFile: UsebioFile | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pbnFile: PBNHand[] | null,
): ScoreCard[] {
  if (!usebioFile) return [];

  const { EVENT: event } = usebioFile.USEBIO;
  const session = event.SESSION;
  const crossImps = event.PARTICIPANTS?.$?.EVENT_TYPE === 'CROSS_IMP';

  switch (event.$.EVENT_TYPE) {
    case 'PAIRS':
    case 'MP_PAIRS':
      return handlePairsEvent(session, event.BOARD, crossImps);
    case 'INDIVIDUAL':
      return mergeScoreCardByContestant(
        event.BOARD?.flatMap(generateIndividualScoreCardForBoard) ?? [],
        'INDIVIDUAL',
      );
    default:
      if (session?.MATCH) {
        return mergeScoreCardByContestant(
          session.MATCH.flatMap(generateTeamsScoreCardForMatch),
          'TEAM',
        );
      }
  }

  return [];
}

function handlePairsEvent(
  session: UsebioFile['USEBIO']['EVENT']['SESSION'],
  boards: UsebioBoard[] | undefined,
  crossImps: boolean,
): ScoreCard[] {
  // const isArray = Array.isArray(session?.SECTION);
  const sections = session?.SECTION
    ? ([] as UsebioSection[]).concat(session.SECTION)
    : [];

  if (sections.length) {
    return crossImps
      ? mergeScoreCardByContestant(
          sections.flatMap(generatePairsScoreCardForSectionIMPPairs),
          'PAIR_IMP',
        )
      : mergeScoreCardByContestant(
          sections.flatMap(generatePairsScoreCardForSectionMPPairs),
          'PAIR_MP',
        );
  }

  if (boards) {
    return crossImps
      ? mergeScoreCardByContestant(
          boards.flatMap((board) => createPairIMPLinesForBoard(null, board)),
          'PAIR_IMP',
        )
      : mergeScoreCardByContestant(
          boards.flatMap((board) => createPairMPLinesForBoard(null, board)),
          'PAIR_MP',
        );
  }

  return [];
}

// ----- ScoreCard Creators -----

export function generatePairsScoreCardForSectionIMPPairs(
  section: UsebioSection,
): PairIMPScoreCard[] {
  return section.BOARD.flatMap((board) =>
    createPairIMPLinesForBoard(section, board),
  );
}

export function generatePairsScoreCardForSectionMPPairs(
  section: UsebioSection,
): PairMPScoreCard[] {
  return section.BOARD.flatMap((board) =>
    createPairMPLinesForBoard(section, board),
  );
}

export function generateIndividualScoreCardForBoard(
  board: UsebioBoard,
): IndividualScoreCard[] {
  const lines = board.TRAVELLER_LINE.map((it) =>
    mapToIndividualScoreCardLine(board.BOARD_NUMBER, it),
  );
  return groupLinesByContestant(lines, ['n', 's', 'e', 'w'], 'INDIVIDUAL');
}

export function generateTeamsScoreCardForMatch(match: Match): TeamScoreCard[] {
  const boardMap = new Map<number, TravellerLine[]>();

  match.BOARD.forEach((board) => {
    const existing = boardMap.get(board.BOARD_NUMBER) ?? [];
    boardMap.set(board.BOARD_NUMBER, [...existing, ...board.TRAVELLER_LINE]);
  });

  const lines = Array.from(boardMap.entries()).flatMap(
    ([boardNumber, travellerLines]) =>
      travellerLines.map((line) =>
        mapToPairIMPScoreCardLine(boardNumber, line),
      ),
  );

  return groupLinesByContestant(lines, ['ns', 'ew'], 'TEAM');
}

// ----- Line Creators -----

export function createPairIMPLinesForBoard(
  section: UsebioSection | null,
  board: UsebioBoard,
): PairIMPScoreCard[] {
  const lines = board.TRAVELLER_LINE.map((line) =>
    mapToPairIMPScoreCardLine(board.BOARD_NUMBER, line),
  );
  return groupLinesByContestant(
    lines,
    ['ns', 'ew'],
    'PAIR_IMP',
    section?.$.SECTION_ID,
  );
}

export function createPairMPLinesForBoard(
  section: UsebioSection | null,
  board: UsebioBoard,
): PairMPScoreCard[] {
  const lines = board.TRAVELLER_LINE.map((line) =>
    mapToPairMPScoreCardLine(board.BOARD_NUMBER, line),
  );
  return groupLinesByContestant(
    lines,
    ['ns', 'ew'],
    'PAIR_MP',
    section?.$.SECTION_ID,
  );
}

// ----- Generic Helpers -----

function groupLinesByContestant<
  T extends ScoreCardLine,
  LineType extends string,
>(
  lines: T[],
  roles: (keyof T)[],
  type: LineType,
  sectionId?: string,
): { type: LineType; contestant: string; lines: T[]; section?: string }[] {
  const contestantMap = new Map<string, T[]>();

  lines.forEach((line) => {
    roles.forEach((role) => {
      const contestant = line[role] as string;
      if (contestant) {
        const group = contestantMap.get(contestant) ?? [];
        contestantMap.set(contestant, [...group, line]);
      }
    });
  });

  return Array.from(contestantMap.entries()).map(([contestant, lines]) => ({
    type,
    contestant,
    lines,
    ...(sectionId ? { section: sectionId } : {}),
  }));
}

function mergeScoreCardByContestant<T extends ScoreCard>(
  scoreCards: T[],
  type: string,
): T[] {
  const merged = new Map<string, ScoreCardLine[]>();

  scoreCards.forEach(({ contestant, lines }) => {
    const current = merged.get(contestant) ?? [];
    merged.set(contestant, [...current, ...lines]);
  });

  return Array.from(merged.entries()).map(([contestant, lines]) => ({
    contestant,
    type,
    lines,
  })) as T[];
}
