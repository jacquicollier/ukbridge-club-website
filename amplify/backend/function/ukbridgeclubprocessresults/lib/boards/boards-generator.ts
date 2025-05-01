import { Usebio, UsebioFile } from '../usebio/model';
import { Board } from './model';
import { createDealFromHandset } from './handset-deal-extrator';
import { createDealFromEventBoards } from './event-board-deal-extractor';
import { createDealFromPBN } from './pbn-deal-extractor';
import { PBNHand } from '../pbn/model';

export function generateBoards(
  usebioFile: UsebioFile | null,
  pbnFile: PBNHand[] | null,
): Board[] {
  let boards: Board[] = [];
  if (usebioFile) {
    boards = createBoardsFromUsebio(usebioFile.USEBIO);
  }

  if (boards.length == 0 && pbnFile) {
    return createDealFromPBN(pbnFile);
  }
  return boards;
}

function createBoardsFromUsebio(usebio: Usebio): Board[] {
  if (usebio.HANDSET) {
    return createDealFromHandset(usebio.HANDSET);
  } else if (usebio.EVENT.SESSION?.HANDSET) {
    return createDealFromHandset(usebio.EVENT.SESSION?.HANDSET);
  }
  return createDealFromEventBoards(usebio);
}
