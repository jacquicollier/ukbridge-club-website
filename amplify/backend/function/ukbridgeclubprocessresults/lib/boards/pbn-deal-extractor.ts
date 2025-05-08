import { PBNHand } from '../pbn/model';
import { Board, Directions, suitOrder } from './model';
import { Direction } from '../model';

export function createDealFromPBN(pbnFile: PBNHand[]): Board[] {
  return pbnFile.map((hand) => {
    return {
      boardNumber: Number(hand.board),
      deal: parseBridgeHand(hand),
    } as Board;
  });
}

export function parseBridgeHand(hand: PBNHand): {
  [key in Direction]: string[];
} {
  const [startingDirection, ...hands] = hand.deal.split(':');
  const handsArray = hands.join(':').split(' '); // Split individual hands
  const startIndex = Directions.indexOf(startingDirection as Direction);

  if (startIndex === -1 || handsArray.length !== 4) {
    throw new Error('Invalid bridge hand format');
  }

  const orderedHands = Directions.map(
    (_, index) => handsArray[(index - startIndex + 4) % 4],
  );

  return Directions.reduce(
    (acc, direction, index) => {
      const handData = orderedHands[index].split('.');

      acc[direction] = suitOrder.reduce<string[]>((suitAcc, suit, i) => {
        const cards =
          handData[i]?.split('').map((rank) => `${suit}${rank}`) ?? [];
        return suitAcc.concat(cards); // Ensure the accumulation works properly
      }, []);

      return acc;
    },
    {} as { [key in Direction]: string[] },
  );
}
