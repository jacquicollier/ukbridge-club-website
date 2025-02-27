import { PlayerHolding, SuitMap } from '@/app/model/constants';
import { rankComparator } from '@/app/hand/components/utils';

export default function PlayerHoldings(props: {
  playerHoldings: Record<string, PlayerHolding>;
}) {
  return (
    <>
      <div className='absolute top-2'>{renderHand(props.playerHoldings.N)}</div>
      <div className='absolute left-2 top-1/2 -translate-y-1/2'>
        {renderHand(props.playerHoldings.W)}
      </div>
      <div className='absolute right-2 top-1/2 -translate-y-1/2'>
        {renderHand(props.playerHoldings.E)}
      </div>
      <div className='absolute bottom-2'>
        {renderHand(props.playerHoldings.S)}
      </div>
    </>
  );
}

// Helper function to render a hand with aligned suits
function renderHand(playerHolding: PlayerHolding) {
  return (
    <div className='flex flex-col items-start text-lg'>
      {Object.entries(playerHolding).map(([suit, cards]) => {
        const sortedCards = Object.entries(cards).sort((a, b) =>
          rankComparator(a[0], b[0]),
        );

        return (
          <div key={suit} className='flex items-start'>
            <span
              className='font-bold'
              style={{
                color: suit === 'H' || suit === 'D' ? 'red' : 'black',
              }}
            >
              {SuitMap[suit]}
            </span>{' '}
            {/* Display suit (♠, ♥, etc.) */}
            <div className='ml-2 flex max-w-[80px] flex-wrap'>
              {sortedCards.map(([rank, played]) => {
                // Extract rank and suit
                const card = `${rank}${SuitMap[suit]}`;
                const cardClass = played ? 'opacity-25' : '';

                return (
                  <div key={card} className={`flex items-center ${cardClass}`}>
                    <span className='mr-0.5'>{rank}</span>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
