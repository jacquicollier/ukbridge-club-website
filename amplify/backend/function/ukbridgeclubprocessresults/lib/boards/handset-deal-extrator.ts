import { Hand, HandSet } from '../usebio/model';
import { Board } from './model';

export function createDealFromHandset(handset: HandSet): Board[] {
  return handset.BOARD.map((handSetBoard) => {
    return {
      boardNumber: Number(handSetBoard.BOARD_NUMBER),
      deal: {
        N: createHand(handSetBoard.HAND.find((h) => h.DIRECTION === 'North')),
        S: createHand(handSetBoard.HAND.find((h) => h.DIRECTION === 'South')),
        E: createHand(handSetBoard.HAND.find((h) => h.DIRECTION === 'East')),
        W: createHand(handSetBoard.HAND.find((h) => h.DIRECTION === 'West')),
      },
    };
  });
}

function createHand(hand?: Hand): string[] {
  if (!hand) return [];
  return [
    ...hand.SPADES.split('').map((rank) => `S${rank}`),
    ...hand.HEARTS.split('').map((rank) => `H${rank}`),
    ...hand.DIAMONDS.split('').map((rank) => `D${rank}`),
    ...hand.CLUBS.split('').map((rank) => `C${rank}`),
  ] as string[];
}
