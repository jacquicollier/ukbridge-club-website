import {
  Usebio,
  UsebioFile,
  Event,
  Participants,
  UsebioSection,
} from './usebio/model';
import { Contestant } from 'shared/contestants/contestant';
import { PBNFile } from './pbn/model';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateContestants(
  usebioFile: UsebioFile | null,
  pbnFile: PBNFile | null,
): Contestant[] {
  if (usebioFile) {
    const usebio: Usebio = usebioFile.USEBIO;
    const event: Event = usebio.EVENT;

    // event.session.section.participants
    if (event.PARTICIPANTS) {
      return generateContestantsForParticipants(event.PARTICIPANTS, null);
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
  return participants.PAIR.map((pair) => {
    return {
      section: section?.$?.SECTION_ID ?? null,
      id: {
        id: Number(pair.PAIR_NUMBER),
        direction: pair.DIRECTION,
      },
      names: pair.PLAYER.map((player) => player.PLAYER_NAME),
    } as Contestant;
  });
}
