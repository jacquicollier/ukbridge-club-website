import { Board } from './model';
import { Usebio, UsebioBoard } from '../usebio/model';
import { createDealFromLIN } from './lin-deal-extractor';
import { Direction } from '../model';

export function createDealFromEventBoards(usebio: Usebio): Board[] {
  if (
    usebio.EVENT.BOARD &&
    usebio.EVENT.BOARD[0].TRAVELLER_LINE?.[0]?.LIN_DATA
  ) {
    return usebio.EVENT.BOARD.map((board) => ({
      boardNumber: Number(board.BOARD_NUMBER),
      deal: createDeal(board),
    }));
  }
  return [];
}

function createDeal(board: UsebioBoard): { [key in Direction]: string[] } {
  const linData = board.TRAVELLER_LINE?.[0]?.LIN_DATA;
  if (linData) {
    return createDealFromLIN(linData);
  }

  return { N: [], W: [], S: [], E: [] };
}
