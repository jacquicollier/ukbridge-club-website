import { UsebioFile } from '../usebio/model';
import { PBNHand } from '../pbn/model';
import { Traveller } from './model';
import {
  generateIndividualTravellerForBoard,
  generatePairsTravellerForBoard,
  generatePairsTravellerForSection,
  generateTeamsTravellerForMatch,
  mergeTravellerPayload,
} from './traveller-generator';

export function generateTravellers(
  usebioFile: UsebioFile | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  pbnFile: PBNHand[] | null,
): Traveller[] {
  if (!usebioFile) return [];

  const { EVENT: event } = usebioFile.USEBIO;
  const session = event.SESSION;
  const scoring = event.BOARD_SCORING_METHOD ?? event.$.EVENT_TYPE;

  switch (event.$.EVENT_TYPE) {
    case 'PAIRS':
    case 'MP_PAIRS':
      if (session?.SECTION) {
        return Array.isArray(session.SECTION)
          ? session.SECTION.flatMap((section) =>
              generatePairsTravellerForSection(scoring, section),
            )
          : generatePairsTravellerForSection(scoring, session.SECTION);
      }
      if (event.BOARD) {
        return event.BOARD.map((board) =>
          generatePairsTravellerForBoard(scoring, null, board),
        );
      }
      break;

    case 'INDIVIDUAL':
      return event.BOARD?.map(generateIndividualTravellerForBoard) ?? [];

    default:
      if (session?.MATCH) {
        const allTravellers = session.MATCH.flatMap(
          generateTeamsTravellerForMatch,
        );
        return mergeTravellerPayload(allTravellers);
      }
      break;
  }

  return [];
}
