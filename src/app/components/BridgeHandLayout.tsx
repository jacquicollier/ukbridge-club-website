import DDSTable from '@/app/components/DDSTable';

export default function BridgeHandLayout() {
  // Define board vulnerability (example: N-S vulnerable, E-W not)
  const vulnerability = {
    N: true,
    S: true,
    E: false,
    W: false,
  };

  // Define a full bridge deal
  const hands = {
    N: {
      '♠': ['A', 'K', 'Q', 'J'],
      '♥': ['10', '9', '8'],
      '♦': ['7', '6'],
      '♣': ['5', '4', '3'],
    },
    E: {
      '♠': [],
      '♥': ['A', 'K', 'Q', 'J', '10', '9', '8'],
      '♦': ['J', '10', '9'],
      '♣': ['8', '7', '6'],
    },
    S: {
      '♠': ['6', '5', '4'],
      '♥': ['A', 'K', 'Q', 'J', '10', '9', '8'],
      '♦': ['A', 'K', 'Q'],
      '♣': ['J', '10', '9'],
    },
    W: {
      '♠': ['3', '2'],
      '♥': ['J', '8', '4', '3', '2'],
      '♦': ['8', '5', '4', '2'],
      '♣': ['A', 'K', 'Q'],
    },
  };

  return (
    <div className='flex h-screen flex-col items-center justify-center p-4'>
      <div className='relative flex size-[500px] flex-col items-center justify-center rounded-lg border-4 border-black p-4'>
        <div className='absolute right-2 top-2 rounded-lg border bg-gray-100 shadow-lg'>
          <h3 className='font-bold'>Optimal Contract</h3>
          <p>4♠ by West</p>
        </div>

        {/* Dealer & Vulnerability Box */}
        <div className='absolute left-1 top-1 rounded-md px-3 py-2 shadow-md'>
          <p>
            Dealer: <span className='font-bold'>W</span>
          </p>
          <p>
            Vul: <span className='font-bold'>N/S</span>
          </p>
        </div>

        {/* North Hand */}
        <div className='absolute top-2'>{renderHand(hands.N)}</div>

        {/* West Hand */}
        <div className='absolute left-2 top-1/2 -translate-y-1/2'>
          {renderHand(hands.W)}
        </div>

        {/* East Hand */}
        <div className='absolute right-2 top-1/2 -translate-y-1/2'>
          {renderHand(hands.E)}
        </div>

        {/* South Hand */}
        <div className='absolute bottom-2'>{renderHand(hands.S)}</div>

        {/* Board Box with Compass Labels and Vulnerability Colors */}
        <div className='absolute flex size-32 flex-col items-center justify-center border-4 border-white bg-gray-800 text-lg font-bold text-white'>
          <div
            className={`absolute top-2 px-2 py-1 text-black ${vulnerability.N ? 'bg-red-500' : 'bg-green-500'}`}
          >
            N
          </div>
          <div className='absolute text-xl font-extrabold'>1</div>
          <div
            className={`absolute bottom-2 px-2 py-1 text-black ${vulnerability.S ? 'bg-red-500' : 'bg-green-500'}`}
          >
            S
          </div>
          <div
            className={`absolute left-2 px-2 py-1 text-black ${vulnerability.W ? 'bg-red-500' : 'bg-green-500'}`}
          >
            W
          </div>
          <div
            className={`absolute right-2 px-2 py-1 text-black ${vulnerability.E ? 'bg-red-500' : 'bg-green-500'}`}
          >
            E
          </div>
        </div>

        <div className='absolute bottom-2 left-2 rounded-lg border bg-gray-100 p-2 shadow-lg'>
          {/* Set width & height to prevent absolute children from overflowing */}
          <div className='relative flex size-20 items-center justify-center'>
            <div className='absolute top-0 px-2 py-1 text-black'>20</div>
            <div className='absolute bottom-0 px-2 py-1 text-black'>5</div>
            <div className='absolute left-0 px-2 py-1 text-black'>13</div>
            <div className='absolute right-0 px-2 py-1 text-black'>2</div>
          </div>
        </div>

        <DDSTable />
      </div>
    </div>
  );
}

const getSuitClass = (suit: string) =>
  suit === '♥' || suit === '♦' ? 'text-red-500' : 'text-black';

// Helper function to render a hand with aligned suits
function renderHand(hand: Record<string, string[]>) {
  return (
    <div className='flex flex-col items-start text-lg'>
      {Object.entries(hand).map(([suit, cards]) => (
        <div key={suit} className='flex items-start'>
          <span className={`font-bold ${getSuitClass(suit)}`}>{suit}</span>
          <div className='ml-2 flex max-w-[100px] flex-wrap'>
            {cards.map((card, index) => (
              <span key={index} className='mr-1'>
                {card}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
