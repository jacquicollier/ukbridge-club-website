import { BoardScore } from 'shared/board/boardscore';
import { Card, Direction } from 'shared/types';
import { Directions, rankOrder, suitOrder } from 'shared/constants';

export function getResult(boardScore: BoardScore) {
  if (!boardScore.tricks) {
    return 'Pass';
  }
  return `${boardScore.contract}${calculateDifference(boardScore.contract, Number(boardScore.tricks))} ${boardScore.declarer}`;
}

export function determineDealer(boardNumber: number): Direction {
  const directions: Direction[] = ['N', 'E', 'S', 'W'];
  return directions[boardNumber % 4];
}

export function generatePbnString(deal: {
  [key in Direction]: Card[];
}): string {
  return (
    'N:' +
    Directions.map((direction) => {
      return convertHandToPbn(deal[direction]);
    }).join(' ')
  );
}

function convertHandToPbn(cards: Card[]): string {
  return suitOrder
    .map((suit) =>
      cards
        .filter((card) => card.suit === suit)
        .sort((a, b) => rankOrder.indexOf(a.rank) - rankOrder.indexOf(b.rank))
        .map((card) => card.rank)
        .join(''),
    )
    .filter(Boolean)
    .join('.');
}

function calculateDifference(contract: string, tricksMade: number): string {
  // Remove doubling/redoubling indicators (x or xx) from the contract
  contract = contract.replace(/x{1,2}$/i, '');

  // Extract the numeric part from the contract
  const match = contract.match(/(\d+)/);
  if (match) {
    const contractLevel = parseInt(match[1], 10);
    const requiredTricks = contractLevel + 6;
    const difference = tricksMade - requiredTricks;
    if (difference < 0) {
      return `${difference}`;
    } else if (difference > 0) {
      return `+${difference}`;
    }
    return '=';
  } else {
    throw new Error('Invalid contract format');
  }
}
