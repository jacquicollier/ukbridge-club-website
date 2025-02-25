import DDSTable from '@/app/hand/components/DDSTable';
import { Hand } from '@/app/model/pbn/hand';
import { parseBridgeHand } from '@/app/model/pbn/utils';
import AuctionTable from '@/app/hand/components/AuctionTable';
import PointCountTable from '@/app/hand/components/PointCountTable';
import Result from '@/app/hand/components/Result';
import PlayedCard from '@/app/hand/components/PlayedCard';

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
    <div className='relative m-2 flex aspect-square w-full max-w-[450px] flex-col items-center justify-center rounded-lg border-2 border-black p-4'>
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
      <div
        className='absolute flex size-32 flex-col items-center justify-center border-4 border-white bg-gray-800 text-lg font-bold text-white'
        style={{ position: 'relative' }}
      >
        {/*<div*/}
        {/*  className={`absolute top-2 px-2 py-1 ${vulnerability.N ? 'bg-red-500' : 'bg-green-500'}`}*/}
        {/*>*/}
        {/*  N*/}
        {/*</div>*/}
        <div className='absolute text-xl font-extrabold'>
          {props.hand.board}
        </div>
        {/*<div*/}
        {/*  className={`absolute bottom-2 px-2 py-1 ${vulnerability.S ? 'bg-red-500' : 'bg-green-500'}`}*/}
        {/*>*/}
        {/*  S*/}
        {/*</div>*/}
        {/*<div*/}
        {/*  className={`absolute left-2 px-2 py-1 ${vulnerability.W ? 'bg-red-500' : 'bg-green-500'}`}*/}
        {/*>*/}
        {/*  W*/}
        {/*</div>*/}
        {/*<div*/}
        {/*  className={`absolute right-2 px-2 py-1 ${vulnerability.E ? 'bg-red-500' : 'bg-green-500'}`}*/}
        {/*>*/}
        {/*  E*/}
        {/*</div>*/}

        {/* Played Cards */}
        {props.playedCards &&
          Object.entries(props.playedCards).map(([player, card]) => (
            <PlayedCard
              key={player}
              player={player}
              card={card}
              leadPlayer={props.hand.declarer}
            />
          ))}
      </div>

      {/* Extra Info */}
      <PointCountTable deal={props.hand.deal} />
      <Result hand={props.hand} />
      {/*<DDSTable />*/}
    </div>
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
