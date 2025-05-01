export type Direction = 'N' | 'E' | 'S' | 'W';
export const Directions: Direction[] = ['N', 'E', 'S', 'W'];

export type Suit = 'S' | 'H' | 'D' | 'C';

type Rank =
  | 'A'
  | 'K'
  | 'Q'
  | 'J'
  | 'T'
  | '9'
  | '8'
  | '7'
  | '6'
  | '5'
  | '4'
  | '3'
  | '2';

export const rankOrder: Rank[] = [
  'A',
  'K',
  'Q',
  'J',
  'T',
  '9',
  '8',
  '7',
  '6',
  '5',
  '4',
  '3',
  '2',
];

export const suitOrder = ['S', 'H', 'D', 'C'];

export const allCards = suitOrder.flatMap((suit) =>
  rankOrder.map((rank) => `${suit}${rank}`),
);

export interface Board {
  boardNumber: number;
  deal: { [key in Direction]: string[] };
}
