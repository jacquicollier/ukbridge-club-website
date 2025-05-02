import {
  Usebio,
  UsebioFile,
  Event,
  Participants,
  UsebioSection,
  Pair,
} from '../usebio/model';
import { Contestant } from 'shared/contestants/contestant';
import { PBNHand } from '../pbn/model';

export function generateContestants(
  usebioFile: UsebioFile | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pbnFile: PBNHand[] | null,
): Contestant[] {
  if (usebioFile) {
    const usebio: Usebio = usebioFile.USEBIO;
    const event: Event = usebio.EVENT;

    // event.session.section.participants
    if (event.PARTICIPANTS) {
      return generateContestantsForParticipants(event.PARTICIPANTS, null);
    } else if (event.SESSION.PARTICIPANTS) {
      return generateContestantsForParticipants(
        event.SESSION.PARTICIPANTS,
        null,
      );
    } else if (Array.isArray(event.SESSION.SECTION)) {
      return event.SESSION.SECTION.flatMap((it) => {
        return generateContestantsForSection(it);
      });
    } else {
      return generateContestantsForSection(event.SESSION.SECTION);
    }
  }

  return [];
}

function generateContestantsForSection(section: UsebioSection): Contestant[] {
  if (section.PARTICIPANTS) {
    return generateContestantsForParticipants(section.PARTICIPANTS, section);
  }
  return [];
}

function generateContestantsForParticipants(
  participants: Participants,
  section: UsebioSection | null,
): Contestant[] {
  if (participants.TEAM) {
    return participants.TEAM.flatMap((team) => {
      return generateContestantsForPairs(team.PAIR, section);
    });
  }
  if (participants.PAIR) {
    return generateContestantsForPairs(participants.PAIR, section);
  } else if (participants.PLAYER) {
    return participants.PLAYER.map((player) => {
      if (section) {
        return {
          section: section.$?.SECTION_ID ?? null,
          id: player.PLAYER_NUMBER,
          names: [player.PLAYER_NAME],
        } as Contestant;
      }
      return {
        id: player.PLAYER_NUMBER,
        names: [player.PLAYER_NAME],
      } as Contestant;
    });
  }
  return [];
}

function generateContestantsForPairs(
  pairs: Pair[],
  section: UsebioSection | null,
): Contestant[] {
  return pairs.map((pair) => {
    if (section) {
      return {
        section: section.$?.SECTION_ID ?? null,
        id: pair.DIRECTION
          ? `${pair.DIRECTION}${pair.PAIR_NUMBER}`
          : pair.PAIR_NUMBER,
        names: pair.PLAYER.map((player) => player.PLAYER_NAME),
      } as Contestant;
    }
    return {
      id: pair.DIRECTION
        ? `${pair.DIRECTION}${pair.PAIR_NUMBER}`
        : pair.PAIR_NUMBER,
      names: pair.PLAYER.map((player) => player.PLAYER_NAME),
    } as Contestant;
  });
}
