import { allCards, Suit } from './model';
import { Direction } from '../model';

export function createDealFromLIN(linString: string): {
  [key in Direction]: string[];
} {
  const directions: Direction[] = ['S', 'W', 'N', 'E'];
  const hands: { [key in Direction]: string[] } = {
    N: [],
    E: [],
    S: [],
    W: [],
  };

  const lin = extractLINValues(linString);
  const decodedMd = decodeURIComponent(lin.md[0] ?? '');
  const cardData = decodedMd.split(',');

  if (![3, 4].includes(cardData.length))
    throw new Error('Invalid md format in LIN data');

  cardData.forEach((hand, idx) => {
    const direction = directions[idx];
    let currentSuit: Suit | null = null;
    for (const char of hand) {
      if ('SHDC'.includes(char)) {
        currentSuit = char as Suit;
      } else if (currentSuit) {
        hands[direction].push(`${currentSuit}${char}`);
      }
    }
  });

  hands.E = findMissingCards(hands); // Assign leftovers
  return hands;
}

function extractLINValues(lin: string) {
  const parts = lin.split('|');
  const values: { md: string[]; mb: string[]; pc: string[] } = {
    md: [],
    mb: [],
    pc: [],
  };

  for (let i = 0; i < parts.length; i += 2) {
    const key = parts[i],
      val = parts[i + 1];
    if (key === 'md') values.md.push(val);
    else if (key === 'mb') values.mb.push(val);
    else if (key === 'pc') values.pc.push(val);
  }

  return values;
}

function findMissingCards(hands: { [key in Direction]: string[] }): string[] {
  const assigned = new Set(hands.S.concat(hands.W, hands.N));
  return allCards.filter((c) => !assigned.has(c));
}
