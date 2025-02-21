export type Hand = Record<string, string[]>;

export const parseBridgeHand = (handString: string): Record<string, Hand> => {
  const suitOrder = ['♠', '♥', '♦', '♣'];
  const directions = ['N', 'E', 'S', 'W'];

  const [startingDirection, ...hands] = handString.split(':');
  const handsArray = hands.join(':').split(' '); // Split individual hands
  const startIndex = directions.indexOf(startingDirection);

  if (startIndex === -1 || handsArray.length !== 4) {
    throw new Error('Invalid bridge hand format');
  }

  // Map hands to their respective directions
  return directions.reduce(
    (acc, direction, index) => {
      const handData = handsArray[(startIndex + index) % 4].split('.'); // Rotate based on starting position
      acc[direction] = Object.fromEntries(
        suitOrder.map((suit, i) => [suit, handData[i]?.split('') ?? []]),
      );
      return acc;
    },
    {} as Record<string, Hand>,
  );
};
