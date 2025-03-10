import { Card, Direction } from '@/app/model/types';

export default function PointCountTable(props: {
  deal: Record<Direction, Card[]>;
}) {
  function calculateMiltonPointCount(cards: Card[]): number {
    const pointValues: Record<string, number> = { J: 1, Q: 2, K: 3, A: 4 };

    // Iterate over suits and their cards
    return cards.reduce((total, card) => {
      return total + (pointValues[card.rank] || 0);
    }, 0);
  }

  return (
    <div className='absolute bottom-2 left-2 rounded-lg border bg-gray-100 p-2 shadow-lg'>
      {/* Set width & height to prevent absolute children from overflowing */}
      <div className='relative flex size-20 items-center justify-center'>
        <div className='absolute top-0 px-2 py-1 text-black'>
          {calculateMiltonPointCount(props.deal.N)}
        </div>
        <div className='absolute bottom-0 px-2 py-1 text-black'>
          {calculateMiltonPointCount(props.deal.S)}
        </div>
        <div className='absolute left-0 px-2 py-1 text-black'>
          {calculateMiltonPointCount(props.deal.W)}
        </div>
        <div className='absolute right-0 px-2 py-1 text-black'>
          {calculateMiltonPointCount(props.deal.E)}
        </div>
      </div>
    </div>
  );
}
