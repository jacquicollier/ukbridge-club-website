import { PlayerHolding } from '@/app/hand/components/PlayerHoldings';

export default function PointCountTable(props: {
  playerHoldings: Record<string, PlayerHolding>;
}) {
  function calculateMiltonPointCount(playerHolding: PlayerHolding): number {
    const pointValues: Record<string, number> = { J: 1, Q: 2, K: 3, A: 4 };

    // Iterate over suits and their cards
    return Object.values(playerHolding).reduce((total, suit) => {
      // Iterate over cards in each suit
      return (
        total +
        Object.keys(suit).reduce((suitTotal, rank) => {
          // Add points for each card based on its rank
          return suitTotal + (pointValues[rank] || 0);
        }, 0)
      );
    }, 0);
  }

  return (
    <div className='absolute bottom-2 left-2 rounded-lg border bg-gray-100 p-2 shadow-lg'>
      {/* Set width & height to prevent absolute children from overflowing */}
      <div className='relative flex size-20 items-center justify-center'>
        <div className='absolute top-0 px-2 py-1 text-black'>
          {calculateMiltonPointCount(props.playerHoldings.N)}
        </div>
        <div className='absolute bottom-0 px-2 py-1 text-black'>
          {calculateMiltonPointCount(props.playerHoldings.S)}
        </div>
        <div className='absolute left-0 px-2 py-1 text-black'>
          {calculateMiltonPointCount(props.playerHoldings.W)}
        </div>
        <div className='absolute right-0 px-2 py-1 text-black'>
          {calculateMiltonPointCount(props.playerHoldings.E)}
        </div>
      </div>
    </div>
  );
}
