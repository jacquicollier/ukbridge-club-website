import { Player, PlayerHolding, rankOrder } from '@/app/model/constants';
import { Hand } from '@/app/model/pbn/hand';

const suitOrder = ['S', 'H', 'D', 'C'];
const directions = ['N', 'E', 'S', 'W'];

export type CardAndPlayer = {
  player: Player;
  suit: string;
  rank: string;
};

export function parseBridgeHand(
  handString: string,
): Record<Player, PlayerHolding> {
  // Split the hand string into direction and hands
  const [startingDirection, ...hands] = handString.split(':');
  const handsArray = hands.join(':').split(' '); // Split individual hands
  const startIndex = directions.indexOf(startingDirection);

  if (startIndex === -1 || handsArray.length !== 4) {
    throw new Error('Invalid bridge hand format');
  }

  // Map hands to their respective directions and suit cards
  return directions.reduce(
    (acc, direction, index) => {
      const handData = handsArray[(startIndex + index) % 4].split('.'); // Rotate based on starting position

      // Create an object for the player's hand
      acc[direction] = suitOrder.reduce((suitAcc, suit, i) => {
        const cards = handData[i]?.split('') ?? []; // Split the string into individual cards

        // For each card in the suit, set its value to `false` (not played yet)
        suitAcc[suit] = cards.reduce(
          (cardAcc, card) => {
            cardAcc[card] = false; // Initialize each card as not played
            return cardAcc;
          },
          {} as Record<string, boolean>,
        );

        return suitAcc;
      }, {} as PlayerHolding);
      return acc;
    },
    {} as Record<string, PlayerHolding>,
  );
}

// Required because the PBN file always starts each trick with the same player
export function mapTricksToLeaders(hand: Hand): CardAndPlayer[] {
  const trumpSuit = determineTrumps(hand.contract);
  const trickList: CardAndPlayer[] = [];

  let leader = hand.play.value as Player; // Starting leader for the first trick
  const opener = hand.play.value as Player;

  hand.play.details.forEach((trick) => {
    if (trick === '*') return; // Skip separator

    const cards = mapTrickToPlayers(leader, opener, trick.split(' ')); // Map the trick to players and their cards
    trickList.push(...cards); // Push the cards to the trickList

    // Determine the new leader for the next trick
    leader = determineTrickWinner(convertToCardMap(cards), leader, trumpSuit); // The next leader is determined by the winner of the current trick
  });

  return trickList;
}

const convertToCardMap = (
  cards: CardAndPlayer[],
): { [key: string]: { suit: string; rank: string } } => {
  return cards.reduce(
    (acc, { player, suit, rank }) => {
      acc[player] = { suit, rank };
      return acc;
    },
    {} as { [key: string]: { suit: string; rank: string } },
  );
};

function mapTrickToPlayers(
  leader: Player,
  opener: Player,
  cards: string[],
): CardAndPlayer[] {
  const startIndex = directions.indexOf(opener); // Find the starting index of the opener
  // const leaderIndex = directions.indexOf(leader); // Find the index of the leader

  // Step 1: Assign cards in the natural order (opener first)
  const naturalOrder: CardAndPlayer[] = [];
  for (let i = 0; i < cards.length; i++) {
    const player = directions[(startIndex + i) % 4] as Player; // Player receiving the card
    const card = cards[i]; // Corresponding card

    if (card !== '-') {
      naturalOrder.push({
        player,
        suit: card.charAt(0), // Suit = first character
        rank: card.slice(1), // Rank = rest of the string
      });
    }
  }

  // Step 2: Reorder so that leader is first, followed by the correct play order
  const leaderPosition = naturalOrder.findIndex(
    (entry) => entry.player === leader,
  );
  return [
    ...naturalOrder.slice(leaderPosition),
    ...naturalOrder.slice(0, leaderPosition),
  ];
}

export function determineTrickWinner(
  trickCards: { [key: string]: { suit: string; rank: string } },
  leader: Player,
  trumpSuit: string | null,
): Player {
  const trick = Object.entries(trickCards); // Convert to array of [player, card]

  // ✅ Identify all cards of the leading suit and trump suit
  const leadingSuit = trickCards[leader].suit;
  const trumpCards =
    trumpSuit == null
      ? []
      : trick.filter(([, card]) => card.suit === trumpSuit);
  const leadingSuitCards = trick.filter(
    ([, card]) => card.suit === leadingSuit,
  );

  let winningTrick: typeof trick;

  if (trumpCards.length > 0) {
    // ✅ If any trump cards are played, highest trump wins
    winningTrick = trumpCards;
  } else {
    // ✅ Otherwise, highest card in the leading suit wins
    winningTrick = leadingSuitCards;
  }

  // ✅ Determine the highest rank in the chosen suit
  winningTrick.sort(([, a], [, b]) => rankComparator(b.rank, a.rank));

  return winningTrick[winningTrick.length - 1][0] as Player; // Return the player with the highest card
}

export function determineTrumps(contract: string): string | null {
  // If the contract is 'Pass', return null (no trumps)
  if (contract === 'Pass') return null;

  // Remove any 'X' or 'XX' from the end of the contract (doubles/redoubles)
  const cleanedContract = contract.replace(/(X|XX)$/, '');

  // Check if the contract is No Trump (e.g., '3NT')
  if (cleanedContract.endsWith('NT')) return null;

  // Extract the last character, which represents the trump suit
  const suit = cleanedContract.slice(-1);

  // Validate and return the trump suit if it's a valid one
  if (['S', 'H', 'D', 'C'].includes(suit)) {
    return suit;
  }

  // Fallback: If the contract format is unexpected, return null
  return null;
}

export function rankComparator(rankA: string, rankB: string): number {
  return rankOrder.indexOf(rankA) - rankOrder.indexOf(rankB);
}
