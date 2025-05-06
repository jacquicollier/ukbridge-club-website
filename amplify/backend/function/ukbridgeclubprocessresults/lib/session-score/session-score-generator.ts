import {
  Event,
  Participants,
  UsebioFile,
  UsebioSection,
} from '../usebio/model';
import { PBNHand } from '../pbn/model';
import {
  IndividualSessionScoreLine,
  PairIMPSessionScoreLine,
  PairMPSessionScoreLine,
  SessionScore,
  TeamsSessionScoreLine,
} from './model';

export function generateSessionScores(
  usebioFile: UsebioFile | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pbnFile: PBNHand[] | null,
): SessionScore[] {
  if (!usebioFile) return [];

  const { EVENT: event } = usebioFile.USEBIO;
  // const session = event.SESSION;
  // const crossImps = event.PARTICIPANTS?.$?.EVENT_TYPE === 'CROSS_IMP';

  switch (event.$.EVENT_TYPE) {
    case 'PAIRS':
    case 'MP_PAIRS':
      return handlePairsEvent(event);
    case 'INDIVIDUAL':
      return handleIndividualEvent(event);
    default:
      return handleTeamsEvent(event);
  }
}

function handlePairsEvent(event: Event): SessionScore[] {
  if (event.SESSION) {
    const sections = event.SESSION?.SECTION
      ? ([] as UsebioSection[]).concat(event.SESSION.SECTION)
      : [];

    if (sections.length > 0) {
      return sections.flatMap((section) =>
        handlePairsEventForSection(section, section.PARTICIPANTS),
      );
    }
    return handlePairsEventForSection(null, event.SESSION.PARTICIPANTS!);
  }

  if (event.PARTICIPANTS) {
    return handlePairsEventForSection(null, event.PARTICIPANTS);
  }
  return [];
}

function handlePairsEventForSection(
  section: UsebioSection | null,
  participants: Participants,
): SessionScore[] {
  if (participants.$?.EVENT_TYPE === 'CROSS_IMP') {
    return [
      {
        type: 'PAIR_IMP',
        ...(section?.$?.SECTION_ID ? { section: section?.$?.SECTION_ID } : {}),
        lines: participants.PAIR!.map((pair) => {
          return {
            masterPoints: pair.MASTER_POINTS?.MASTER_POINTS_AWARDED,
            masterPointType: pair.MASTER_POINTS?.MASTER_POINT_TYPE,
            contestant: pair.PAIR_NUMBER,
            position: pair.PLACE,
            imps: pair.TOTAL_SCORE,
          } as PairIMPSessionScoreLine;
        }),
      },
    ];
  } else {
    return [
      {
        type: 'PAIR_MP',
        ...(section?.$?.SECTION_ID ? { section: section?.$?.SECTION_ID } : {}),
        lines: participants.PAIR!.map((pair) => {
          return {
            masterPoints: pair.MASTER_POINTS?.MASTER_POINTS_AWARDED,
            masterPointType: pair.MASTER_POINTS?.MASTER_POINT_TYPE,
            contestant: pair.PAIR_NUMBER,
            position: pair.PLACE,
            percentage: pair.PERCENTAGE,
          } as PairMPSessionScoreLine;
        }),
      },
    ];
  }
}

function handleIndividualEvent(event: Event): SessionScore[] {
  if (event.PARTICIPANTS) {
    return [
      {
        type: 'INDIVIDUAL',
        section: '',
        lines: event.PARTICIPANTS.PLAYER!.map((player) => {
          return {
            masterPoints: player.MASTER_POINTS?.MASTER_POINTS_AWARDED,
            masterPointType: player.MASTER_POINTS?.MASTER_POINT_TYPE,
            contestant: player.PLAYER_NUMBER,
            position: player.PLACE,
            percentage: player.PERCENTAGE,
          } as IndividualSessionScoreLine;
        }),
      },
    ];
  }
  return [];
}

function handleTeamsEvent(event: Event): SessionScore[] {
  if (event.SESSION) {
    const sections = event.SESSION?.SECTION
      ? ([] as UsebioSection[]).concat(event.SESSION.SECTION)
      : [];

    if (sections.length > 0) {
      return sections.flatMap((section) =>
        handleTeamsEventForSection(section, section.PARTICIPANTS),
      );
    }
    return handleTeamsEventForSection(null, event.SESSION.PARTICIPANTS!);
  }

  if (event.PARTICIPANTS) {
    return handleTeamsEventForSection(null, event.PARTICIPANTS);
  }
  return [];
}

function handleTeamsEventForSection(
  section: UsebioSection | null,
  participants: Participants,
): SessionScore[] {
  if (participants.TEAM) {
    return [
      {
        type: 'TEAM',
        ...(section?.$?.SECTION_ID ? { section: section?.$?.SECTION_ID } : {}),
        lines: participants.TEAM.map((team) => {
          return {
            masterPoints: team.MASTER_POINTS?.MASTER_POINTS_AWARDED,
            masterPointType: team.MASTER_POINTS?.MASTER_POINT_TYPE,
            position: team.PLACE,
            imps: team.TOTAL_SCORE,
            pairs: team.PAIR.map((pair) => {
              return {
                contestant: pair.PAIR_NUMBER,
                imps: pair.PAIR_IMPS,
                boardsPlayed: pair.BOARDS_PLAYED,
              };
            }),
          } as TeamsSessionScoreLine;
        }),
      },
    ];
  }
  return [];
}
