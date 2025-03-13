import { Card, Direction } from '@/app/model/types';
import { Directions, rankOrder, suitOrder } from '@/app/model/constants';

export function determineTrickWinner(
  trick: Card[],
  leaderIndex: number,
  trumpSuit: string | null,
): number {
  const leadSuit = trick[0].suit;
  let winningIndex = 0;

  // If there's a trump suit, we need to consider it
  if (trumpSuit) {
    let highestTrumpCardIndex = -1;
    let highestTrumpRankValue = -1;

    // Find the highest trump card played in this trick
    for (let i = 0; i < trick.length; i++) {
      if (trick[i].suit === trumpSuit) {
        const currentTrumpRankValue = rankOrder.indexOf(trick[i].rank);
        if (currentTrumpRankValue > highestTrumpRankValue) {
          highestTrumpRankValue = currentTrumpRankValue;
          highestTrumpCardIndex = i;
        }
      }
    }

    // If a trump card was played, the highest one wins
    if (highestTrumpCardIndex !== -1) {
      return (leaderIndex + highestTrumpCardIndex) % 4;
    }
  }

  // If no trump suit or no trump card is played, we compare by the lead suit
  for (let i = 1; i < trick.length; i++) {
    if (
      trick[i].suit === leadSuit &&
      rankOrder.indexOf(trick[i].rank) >
        rankOrder.indexOf(trick[winningIndex].rank)
    ) {
      winningIndex = i;
    }
  }

  // Convert trick-relative index to the actual player's index in `directions`
  return (leaderIndex + winningIndex) % 4;
}

export function determineTrumps(contract: string): string | null {
  if (contract === 'Pass') return null;
  const cleanedContract = contract.replace(/(X|XX)$/, '');
  if (cleanedContract.endsWith('NT')) return null;
  const suit = cleanedContract.slice(-1);
  return suitOrder.includes(suit) ? suit : null;
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
