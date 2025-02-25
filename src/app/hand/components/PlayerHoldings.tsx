import { rankOrder } from '@/app/model/constants';

export type PlayerHolding = {
  [suit: string]: Record<string, boolean>;
};

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
        const sortedCards = Object.keys(cards).sort(
          (a, b) => rankOrder.indexOf(a) - rankOrder.indexOf(b),
        );

        return (
          <div key={suit} className='flex items-start'>
            <span
              className='font-bold'
              style={{
                color: suit === '♥' || suit === '♦' ? 'red' : 'black',
              }}
            >
              {suit}
            </span>{' '}
            {/* Display suit (♠, ♥, etc.) */}
            <div className='ml-2 flex max-w-[80px] flex-wrap'>
              {sortedCards.map(([rank, played]) => {
                // Extract rank and suit
                const card = `${rank}${suit}`;
                const cardClass = played ? 'bg-gray-400 opacity-50' : ''; // Grey and faded if played

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
