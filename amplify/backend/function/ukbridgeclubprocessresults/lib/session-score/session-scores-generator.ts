import { Pair, Usebio, UsebioFile, UsebioSection } from '../usebio/model';
import { PBNHand } from '../pbn/model';
import { PairMPSessionScore, SectionSessionScores, Model } from './model';
import { Board } from '../boards/model';
import { BoardResult } from 'shared/constants';
import { PairMPTravellerLine } from 'shared/traveller/travellerLine';

export function generateSessionScores(
  usebioFile: UsebioFile | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pbnFile: PBNHand[] | null,
): SectionSessionScores[] {
  if (!usebioFile) {
    return [];
  }

  if (!usebioFile.USEBIO.EVENT.SESSION) {
    const pairs = usebioFile.USEBIO.EVENT.PARTICIPANTS?.PAIR ?? [];

    return [
      {
        name: '',
        sessionScores: createPairMPSessionScores(pairs),
      },
    ];
  }
  if (Array.isArray(usebioFile.USEBIO.EVENT.SESSION.SECTION)) {
    const sections = usebioFile.USEBIO.EVENT.SESSION.SECTION.map((section) => {
      const pairs = findPairs(usebioFile.USEBIO, section);

      return {
        name: section.$.SECTION_ID,
        sessionScores: createPairMPSessionScores(pairs),
      };
    });

    if (usebioFile.USEBIO.EVENT.WINNER_TYPE == 1) {
      return [
        {
          name: '',
          sessionScores: sections.reduce<Model[]>(
            (acc, section) => acc.concat(section.sessionScores),
            [],
          ),
        },
      ];
    }
    return sections;
  } else {
    const pairs = findPairs(
      usebioFile.USEBIO,
      usebioFile.USEBIO.EVENT.SESSION.SECTION,
    );

    return [
      {
        name: '',
        sessionScores: createPairMPSessionScores(pairs),
      },
    ];
  }
}

function findPairs(usebio: Usebio, section: UsebioSection): Pair[] {
  if (usebio.EVENT.PARTICIPANTS) {
    return usebio.EVENT.PARTICIPANTS.PAIR;
  }
  return section.PARTICIPANTS.PAIR;
}

function createPairMPSessionScores(boards: Board[], pairs: Pair[]): Model[] {
  return pairs.reduce<Model[]>((acc, pair) => {
    acc.push({
      type: 'PAIR_MP',
      position: pair.PLACE,
      masterPoints: pair.MASTER_POINTS?.MASTER_POINTS_AWARDED,
      masterPointType: pair.MASTER_POINTS?.MASTER_POINT_TYPE,
      contestant: pair.DIRECTION
        ? `${pair.PAIR_NUMBER}${pair.DIRECTION}`
        : pair.PAIR_NUMBER,
      matchPoints: calculateContestantMP(boards, pair),
      tops: calculateTops(boards, pair),
    } as PairMPSessionScore);
    return acc;
  }, []);
}

function calculateContestantMP(boards: Board[], pair: Pair): number {
  return boards.reduce(
    (acc, board) =>
      acc + getMatchPointsForPair(pair, findBoardResult(pair, board)),
    0,
  );
}

function getMatchPointsForPair(pair: Pair, boardResult?: BoardResult): number {
  if (!boardResult) return 0;
  const { nsMatchPoints, ewMatchPoints, ns } =
    boardResult.boardScore as PairMPTravellerLine;

  if (pair.DIRECTION) {
    return pair.DIRECTION === 'NS' ? nsMatchPoints : ewMatchPoints;
  }

  return pair.PAIR_NUMBER === ns ? nsMatchPoints : ewMatchPoints;
}

function calculateTops(boards: Board[], pair: Pair): number {
  return boards.reduce(
    (acc, board) => acc + getTotalMatchPoints(findBoardResult(pair, board)),
    0,
  );
}

function getTotalMatchPoints(boardResult?: BoardResult): number {
  if (!boardResult) return 0;
  const { nsMatchPoints, ewMatchPoints } =
    boardResult.boardScore as PairMPTravellerLine;
  return nsMatchPoints + ewMatchPoints;
}

function findBoardResult(pair: Pair, board: Board): BoardResult | undefined {
  return board.results.find((it) =>
    pair.DIRECTION
      ? pair.PAIR_NUMBER ===
        (pair.DIRECTION === 'NS' ? it.boardScore.ns : it.boardScore.ew)
      : pair.PAIR_NUMBER === it.boardScore.ns ||
        pair.PAIR_NUMBER === it.boardScore.ew,
  );
}
