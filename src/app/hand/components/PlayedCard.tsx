export default function PlayedCard({
  player,
  card,
  leadPlayer,
}: {
  player: string;
  card: { rank: string; suit: string };
  leadPlayer: string;
}) {
  // Positions relative to the board (centered in a diamond shape)
  const getCardPosition = (player: string) =>
    ({
      N: { top: '5%', left: '50%', transform: 'translateX(-50%)' }, // Move slightly up
      E: { right: '5%', top: '50%', transform: 'translateY(-50%)' }, // Move slightly right
      S: { bottom: '5%', left: '50%', transform: 'translateX(-50%)' }, // Move slightly down
      W: { left: '5%', top: '50%', transform: 'translateY(-50%)' }, // Move slightly left
    })[player] || {};

  const playOrder: Record<string, Array<string>> = {
    N: ['N', 'E', 'S', 'W'],
    E: ['E', 'S', 'W', 'N'],
    S: ['S', 'W', 'N', 'E'],
    W: ['W', 'N', 'E', 'S'],
  };

  const order = playOrder[leadPlayer] || ['N', 'E', 'S', 'W'];
  const zIndex = order.indexOf(player) + 10; // Higher index = on top

  return (
    <div
      className='absolute flex items-center justify-center rounded-lg border-2 border-black bg-white p-1 text-xl font-bold shadow-lg sm:border'
      style={{
        ...getCardPosition(player),
        color: card.suit === '♥' || card.suit === '♦' ? 'red' : 'black',
        zIndex, // Ensure correct stacking order
      }}
    >
      {card.rank}
      {card.suit}
    </div>
  );
}
