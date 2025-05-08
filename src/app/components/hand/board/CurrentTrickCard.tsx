import { Card, Direction, SuitMap } from '@/app/components/hand/board/model';

export default function CurrentTrickCard({
  player,
  card,
  currentLeader,
}: {
  player: Direction;
  card: Card;
  currentLeader: Direction;
}) {
  // Positions relative to the board (centered in a diamond shape)
  const getCardPosition = (player: Direction) =>
    ({
      N: { top: '5%', left: '50%', transform: 'translateX(-50%)' }, // Move slightly up
      E: { right: '5%', top: '50%', transform: 'translateY(-50%)' }, // Move slightly right
      S: { bottom: '5%', left: '50%', transform: 'translateX(-50%)' }, // Move slightly down
      W: { left: '5%', top: '50%', transform: 'translateY(-50%)' }, // Move slightly left
    })[player] || {};

  const playOrder: Record<Direction, Array<Direction>> = {
    N: ['N', 'E', 'S', 'W'],
    E: ['E', 'S', 'W', 'N'],
    S: ['S', 'W', 'N', 'E'],
    W: ['W', 'N', 'E', 'S'],
  };

  const order = currentLeader ? playOrder[currentLeader] : playOrder.N;
  const zIndex = order.indexOf(player) + 10; // Higher index = on top

  return (
    <div
      className='absolute flex items-center justify-center rounded-lg border-2 border-black bg-white p-1 text-sm font-bold shadow-lg sm:border md:text-lg'
      style={{
        ...getCardPosition(player),
        color: card.suit === 'H' || card.suit === 'D' ? 'red' : 'black',
        zIndex, // Ensure correct stacking order
      }}
    >
      {card.rank}
      {SuitMap[card.suit]}
    </div>
  );
}
