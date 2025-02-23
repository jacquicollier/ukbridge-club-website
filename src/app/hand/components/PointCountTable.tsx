import { parseBridgeHand } from '@/app/model/pbn/utils';

export default function PointCountTable(props: { deal: string }) {
  const hands = parseBridgeHand(props.deal);

  function calculateMiltonPointCount(hand: Record<string, string[]>): number {
    const pointValues: Record<string, number> = { J: 1, Q: 2, K: 3, A: 4 };

    return Object.values(hand)
      .flat()
      .reduce((total, card) => {
        return total + (pointValues[card] || 0);
      }, 0);
  }

  return (
    <div className='absolute bottom-2 left-2 rounded-lg border bg-gray-100 p-2 shadow-lg'>
      {/* Set width & height to prevent absolute children from overflowing */}
      <div className='relative flex size-20 items-center justify-center'>
        <div className='absolute top-0 px-2 py-1 text-black'>
          {calculateMiltonPointCount(hands.N)}
        </div>
        <div className='absolute bottom-0 px-2 py-1 text-black'>
          {calculateMiltonPointCount(hands.S)}
        </div>
        <div className='absolute left-0 px-2 py-1 text-black'>
          {calculateMiltonPointCount(hands.W)}
        </div>
        <div className='absolute right-0 px-2 py-1 text-black'>
          {calculateMiltonPointCount(hands.E)}
        </div>
      </div>
    </div>
  );
}
