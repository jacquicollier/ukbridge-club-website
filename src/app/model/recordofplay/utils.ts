import { Card, Direction } from '@/app/model/types';
import { rankOrder, suitOrder } from '@/app/model/constants';

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

export function determineDealer(boardNumber: number): Direction {
  const directions: Direction[] = ['N', 'E', 'S', 'W'];
  return directions[boardNumber % 4];
}
