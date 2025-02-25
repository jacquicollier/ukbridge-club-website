export type PlayerHolding = Record<string, string[]>;

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
function renderHand(hand: Record<string, string[]>) {
  return (
    <div className='flex flex-col items-start text-lg'>
      {Object.entries(hand).map(([suit, cards]) => (
        <div key={suit} className='flex items-start'>
          <span
            className='font-bold'
            style={{
              color: suit === '♥' || suit === '♦' ? 'red' : 'black',
            }}
          >
            {suit}
          </span>
          <div className='ml-2 flex max-w-[80px] flex-wrap'>
            {cards.map((card, index) => (
              <span key={index} className='mr-0.5'>
                {card}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
