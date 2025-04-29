import { Usebio, UsebioFile, Event } from './usebio/model';
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

    if (event.PARTICIPANTS) {
      return event.PARTICIPANTS.PAIR.map((pair) => {
        return {
          id: {
            id: Number(pair.PAIR_NUMBER),
            direction: pair.DIRECTION,
          },
          names: pair.PLAYER.map((player) => player.PLAYER_NAME),
        } as Contestant;
      });
    }

    return [];
  }

  return [];
}
