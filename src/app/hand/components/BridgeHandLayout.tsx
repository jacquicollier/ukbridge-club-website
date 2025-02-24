import DDSTable from '@/app/hand/components/DDSTable';
import { Hand } from '@/app/model/pbn/hand';
import { parseBridgeHand } from '@/app/model/pbn/utils';
import AuctionTable from '@/app/hand/components/AuctionTable';
import PointCountTable from '@/app/hand/components/PointCountTable';

export default function BridgeHandLayout(props: {
  hand: Hand;
  result: boolean;
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
      <AuctionTable auction={props.hand.auction} />

      {/*<div className='absolute right-2 top-2 rounded-lg border bg-gray-100 shadow-lg'>*/}
      {/*  <h3 className='font-bold'>Optimal Contract</h3>*/}
      {/*  <p>4♠ by West</p>*/}
      {/*</div>*/}

      {/* Dealer & Vulnerability Box */}
      <div className='absolute left-1 top-1 rounded-md px-3 py-2 shadow-md'>
        <p>
          Dealer: <span className='font-bold'>{props.hand.dealer}</span>
        </p>
        <p>
          Vul: <span className='font-bold'>{props.hand.vulnerable}</span>
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
          className={`absolute top-2 px-2 py-1 ${vulnerability.N ? 'bg-red-500' : 'bg-green-500'} ${props.hand.dealer === 'N' ? 'text-white' : 'text-black'}`}
        >
          N
        </div>
        <div className='absolute text-xl font-extrabold'>
          {props.hand.board}
        </div>
        <div
          className={`absolute bottom-2 px-2 py-1 ${vulnerability.S ? 'bg-red-500' : 'bg-green-500'} ${props.hand.dealer === 'S' ? 'text-white' : 'text-black'}`}
        >
          S
        </div>
        <div
          className={`absolute left-2 px-2 py-1 ${vulnerability.W ? 'bg-red-500' : 'bg-green-500'} ${props.hand.dealer === 'W' ? 'text-white' : 'text-black'}`}
        >
          W
        </div>
        <div
          className={`absolute right-2 px-2 py-1 ${vulnerability.E ? 'bg-red-500' : 'bg-green-500'} ${props.hand.dealer === 'E' ? 'text-white' : 'text-black'}`}
        >
          E
        </div>
      </div>

      <PointCountTable deal={props.hand.deal} />

      {/*<Result contract={props.hand.contract} declarer={props.hand.declarer} result={props.hand.result} />*/}
      <DDSTable />
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
