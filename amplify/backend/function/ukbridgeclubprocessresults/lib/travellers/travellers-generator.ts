import {
  Event,
  Match,
  TravellerLine,
  Usebio,
  UsebioBoard,
  UsebioFile,
  UsebioSection,
} from '../usebio/model';
import { PBNHand } from '../pbn/model';
import {
  IndividualTraveller,
  PairIMPTraveller,
  PairIMPTravellerLine,
  PairMPTraveller,
  TeamTraveller,
  Traveller,
} from './model';

export function generateTravellers(
  usebioFile: UsebioFile | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pbnFile: PBNHand[] | null,
): Traveller[] {
  if (usebioFile) {
    const usebio: Usebio = usebioFile.USEBIO;
    const event: Event = usebio.EVENT;

    const session = event.SESSION;

    if (event.$.EVENT_TYPE === 'PAIRS' || event.$.EVENT_TYPE === 'MP_PAIRS') {
      if (session && session.SECTION) {
        if (Array.isArray(session.SECTION)) {
          return session.SECTION.flatMap((s) => {
            return generatePairsTravellerForSection(
              event.BOARD_SCORING_METHOD ?? event.$.EVENT_TYPE,
              s,
            );
          });
        }
        return generatePairsTravellerForSection(
          event.BOARD_SCORING_METHOD ?? event.$.EVENT_TYPE,
          session.SECTION,
        );
      } else if (event.BOARD) {
        return event.BOARD.map((board) => {
          return generatePairsTravellerForBoard(
            event.BOARD_SCORING_METHOD ?? event.$.EVENT_TYPE,
            null,
            board,
          );
        });
      }
    } else if (event.$.EVENT_TYPE === 'INDIVIDUAL') {
      if (event.BOARD) {
        return event.BOARD.map((board) => {
          return generateIndividualTravellerForBoard(board);
        });
      }
    } else {
      if (event.SESSION.MATCH) {
        return mergeTravellerPayload(
          event.SESSION.MATCH?.flatMap((match) => {
            return generateTeamsTravellerForMatch(match);
          }),
        );
      }
    }
  }
  return [];
}

function generatePairsTravellerForSection(
  scoringMethod: string,
  section: UsebioSection,
): Traveller[] {
  return section.BOARD.map((board) => {
    return generatePairsTravellerForBoard(scoringMethod, section, board);
  });
}

function generatePairsTravellerForBoard(
  scoringMethod: string,
  section: UsebioSection | null,
  board: UsebioBoard,
): Traveller {
  if (section) {
    if (scoringMethod === 'MATCH_POINTS' || scoringMethod === 'MP_PAIRS') {
      return {
        type: 'PAIR_MP',
        section: section.$.SECTION_ID,
        board: board.BOARD_NUMBER,
        lines: board.TRAVELLER_LINE.map((travellerLine) => {
          return {
            ns: travellerLine.NS_PAIR_NUMBER,
            ew: travellerLine.EW_PAIR_NUMBER,
            contract: travellerLine.CONTRACT,
            lead: travellerLine.LEAD,
            declarer: travellerLine.PLAYED_BY,
            score: travellerLine.SCORE,
            tricks: isNaN(Number(travellerLine.TRICKS))
              ? null
              : Number(travellerLine.TRICKS),
            nsMatchPoints: Number(travellerLine.NS_MATCH_POINTS),
            ewMatchPoints: Number(travellerLine.EW_MATCH_POINTS),
          };
        }),
      } as PairMPTraveller;
    }
    return {
      type: 'PAIR_IMP',
      section: section.$.SECTION_ID,
      board: board.BOARD_NUMBER,
      lines: board.TRAVELLER_LINE.map((travellerLine) => {
        return {
          ns: travellerLine.NS_PAIR_NUMBER,
          ew: travellerLine.EW_PAIR_NUMBER,
          contract: travellerLine.CONTRACT,
          lead: travellerLine.LEAD,
          declarer: travellerLine.PLAYED_BY,
          score: travellerLine.SCORE,
          tricks: isNaN(Number(travellerLine.TRICKS))
            ? null
            : Number(travellerLine.TRICKS),
          nsCrossImps: Number(travellerLine.NS_CROSS_IMP_POINTS),
          ewCrossImps: Number(travellerLine.EW_CROSS_IMP_POINTS),
        };
      }),
    } as PairIMPTraveller;
  } else {
    if (scoringMethod === 'MATCH_POINTS' || scoringMethod === 'MP_PAIRS') {
      return {
        type: 'PAIR_MP',
        board: board.BOARD_NUMBER,
        lines: board.TRAVELLER_LINE.map((travellerLine) => {
          return {
            ns: travellerLine.NS_PAIR_NUMBER,
            ew: travellerLine.EW_PAIR_NUMBER,
            contract: travellerLine.CONTRACT,
            lead: travellerLine.LEAD,
            declarer: travellerLine.PLAYED_BY,
            score: travellerLine.SCORE,
            tricks: isNaN(Number(travellerLine.TRICKS))
              ? null
              : Number(travellerLine.TRICKS),
            nsMatchPoints: Number(travellerLine.NS_MATCH_POINTS),
            ewMatchPoints: Number(travellerLine.EW_MATCH_POINTS),
          };
        }),
      } as PairMPTraveller;
    }
    return {
      type: 'PAIR_IMP',
      board: board.BOARD_NUMBER,
      lines: board.TRAVELLER_LINE.map((travellerLine) => {
        return {
          ns: travellerLine.NS_PAIR_NUMBER,
          ew: travellerLine.EW_PAIR_NUMBER,
          contract: travellerLine.CONTRACT,
          lead: travellerLine.LEAD,
          declarer: travellerLine.PLAYED_BY,
          score: travellerLine.SCORE,
          tricks: isNaN(Number(travellerLine.TRICKS))
            ? null
            : Number(travellerLine.TRICKS),
          nsCrossImps: Number(travellerLine.NS_CROSS_IMP_POINTS),
          ewCrossImps: Number(travellerLine.EW_CROSS_IMP_POINTS),
        };
      }),
    } as PairIMPTraveller;
  }
}

function generateIndividualTravellerForBoard(board: UsebioBoard): Traveller {
  return {
    type: 'INDIVIDUAL',
    board: board.BOARD_NUMBER,
    lines: board.TRAVELLER_LINE.map((travellerLine) => {
      return {
        n: travellerLine.N_PLAYER_NUMBER,
        s: travellerLine.S_PLAYER_NUMBER,
        e: travellerLine.E_PLAYER_NUMBER,
        w: travellerLine.W_PLAYER_NUMBER,
        contract: travellerLine.CONTRACT,
        lead: travellerLine.LEAD,
        declarer: travellerLine.PLAYED_BY,
        score: travellerLine.SCORE,
        tricks: isNaN(Number(travellerLine.TRICKS))
          ? null
          : Number(travellerLine.TRICKS),
        nsMatchPoints: Number(travellerLine.NS_MATCH_POINTS),
        ewMatchPoints: Number(travellerLine.EW_MATCH_POINTS),
      };
    }),
  } as IndividualTraveller;
}

function generateTeamsTravellerForMatch(match: Match): TeamTraveller[] {
  const boardMap = new Map<number, TravellerLine[]>();

  // Group all traveller lines by board number
  match.BOARD.forEach((board) => {
    const boardNumber = board.BOARD_NUMBER;
    if (!boardMap.has(boardNumber)) {
      boardMap.set(boardNumber, []);
    }
    boardMap.get(boardNumber)!.push(...board.TRAVELLER_LINE);
  });

  return Array.from(boardMap.entries()).map(
    ([boardNumber, travellerLines]) => ({
      type: 'TEAM',
      board: boardNumber,
      lines: travellerLines.map(
        (travellerLine) =>
          ({
            ns: travellerLine.NS_PAIR_NUMBER,
            ew: travellerLine.EW_PAIR_NUMBER,
            contract: travellerLine.CONTRACT,
            lead: travellerLine.LEAD,
            declarer: travellerLine.PLAYED_BY,
            score: travellerLine.SCORE,
            tricks: isNaN(Number(travellerLine.TRICKS))
              ? null
              : Number(travellerLine.TRICKS),
            nsCrossImps: Number(travellerLine.NS_CROSS_IMP_POINTS),
            ewCrossImps: Number(travellerLine.EW_CROSS_IMP_POINTS),
          }) as PairIMPTravellerLine,
      ),
    }),
  );
}

function mergeTravellerPayload(payload: TeamTraveller[]): TeamTraveller[] {
  const boardMap = new Map<number, PairIMPTravellerLine[]>();

  payload.forEach((entry) => {
    const board = entry.board;
    if (!boardMap.has(board)) {
      boardMap.set(board, []);
    }
    boardMap.get(board)!.push(...entry.lines);
  });

  return Array.from(boardMap.entries()).map(([board, lines]) => ({
    type: 'TEAM',
    board,
    lines,
  }));
}
