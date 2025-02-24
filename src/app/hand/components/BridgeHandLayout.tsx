import DDSTable from '@/app/hand/components/DDSTable';
import { Hand } from '@/app/model/pbn/hand';
import { parseBridgeHand } from '@/app/model/pbn/utils';
import AuctionTable from '@/app/hand/components/AuctionTable';
import PointCountTable from '@/app/hand/components/PointCountTable';

export default function BridgeHandLayout(props: {
  hand: Hand;
  result: boolean;
  playedCards?: { [key: string]: { suit: string; rank: string } }; // Cards played by each player
}) {
  const vulnerability = {
    N: ['NS', 'Both', 'All'].includes(props.hand.vulnerable),
    S: ['NS', 'Both', 'All'].includes(props.hand.vulnerable),
    E: ['EW', 'Both', 'All'].includes(props.hand.vulnerable),
    W: ['EW', 'Both', 'All'].includes(props.hand.vulnerable),
  };

  const hands = parseBridgeHand(props.hand.deal);

  return (
    <div className='relative m-2 flex size-[450px] flex-col items-center justify-center rounded-lg border-2 border-black p-4'>
      {/* Auction Table */}
      <AuctionTable auction={props.hand.auction} />

      {/* Dealer & Vulnerability Box */}
      <div className='absolute left-1 top-1 rounded-md px-3 py-2 shadow-md'>
        <p>
          Dealer: <span className='font-bold'>{props.hand.dealer}</span>
        </p>
        <p>
          Vul: <span className='font-bold'>{props.hand.vulnerable}</span>
        </p>
      </div>

      {/* Hands */}
      <div className='absolute top-2'>{renderHand(hands.N)}</div>
      <div className='absolute left-2 top-1/2 -translate-y-1/2'>
        {renderHand(hands.W)}
      </div>
      <div className='absolute right-2 top-1/2 -translate-y-1/2'>
        {renderHand(hands.E)}
      </div>
      <div className='absolute bottom-2'>{renderHand(hands.S)}</div>

      {/* Board */}
      <div className='absolute flex size-32 flex-col items-center justify-center border-4 border-white bg-gray-800 text-lg font-bold text-white'>
        <div
          className={`absolute top-2 px-2 py-1 ${vulnerability.N ? 'bg-red-500' : 'bg-green-500'}`}
        >
          N
        </div>
        <div className='absolute text-xl font-extrabold'>
          {props.hand.board}
        </div>
        <div
          className={`absolute bottom-2 px-2 py-1 ${vulnerability.S ? 'bg-red-500' : 'bg-green-500'}`}
        >
          S
        </div>
        <div
          className={`absolute left-2 px-2 py-1 ${vulnerability.W ? 'bg-red-500' : 'bg-green-500'}`}
        >
          W
        </div>
        <div
          className={`absolute right-2 px-2 py-1 ${vulnerability.E ? 'bg-red-500' : 'bg-green-500'}`}
        >
          E
        </div>
      </div>

      {/* Played Cards */}
      {props.playedCards &&
        Object.entries(props.playedCards).map(([player, card]) => (
          <div
            key={player}
            className='absolute flex items-center justify-center rounded-lg border-2 border-black bg-white p-2 text-xl font-bold shadow-lg'
            style={{
              ...getCardPosition(player),
              color: card.suit === '♥' || card.suit === '♦' ? 'red' : 'black',
            }}
          >
            {card.rank}
            {card.suit}
          </div>
        ))}

      {/* Extra Info */}
      <PointCountTable deal={props.hand.deal} />
      <DDSTable />
    </div>
  );
}

const getCardPosition = (player: string) => {
  switch (player) {
    case 'N':
      return { top: '125px', left: '50%', transform: 'translateX(-50%)' };
    case 'E':
      return { right: '125px', top: '50%', transform: 'translateY(-50%)' };
    case 'S':
      return { bottom: '125px', left: '50%', transform: 'translateX(-50%)' };
    case 'W':
      return { left: '125px', top: '50%', transform: 'translateY(-50%)' };
    default:
      return {};
  }
};

const getSuitClass = (suit: string) =>
  suit === '♥' || suit === '♦' ? 'text-red-500' : 'text-black';

// Helper function to render a hand with aligned suits
function renderHand(hand: Record<string, string[]>) {
  return (
    <div className='flex flex-col items-start text-lg'>
      {Object.entries(hand).map(([suit, cards]) => (
        <div key={suit} className='flex items-start'>
          <span className={`font-bold ${getSuitClass(suit)}`}>{suit}</span>
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
