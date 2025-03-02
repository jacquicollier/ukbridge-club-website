import { Hand } from '@/app/model/pbn/hand';
import AuctionTable from '@/app/hand/components/AuctionTable';
import DealerAndVul from '@/app/hand/components/DealerAndVul';
import PlayerHoldings from '@/app/hand/components/PlayerHoldings';
import CurrentTrickCards from '@/app/hand/components/CurrentTrickCards';
import PointCountTable from '@/app/hand/components/PointCountTable';
import Result from '@/app/hand/components/Result';
import { Player, PlayerHolding } from '@/app/model/constants';
// import DDSTable from '@/app/hand/components/DDSTable';

export default function BridgeBoard(props: {
  hand: Hand;
  result: boolean;
  currentTrickCards?: { [key: string]: { suit: string; rank: string } };
  currenLeader: string | null;
  playerHoldings: Record<Player, PlayerHolding> | null;
}) {
  return (
    <>
      <div className='relative flex aspect-square w-full max-w-[450px] flex-col items-center justify-center border-2 border-black p-4'>
        {/* Auction Table */}
        {props.hand.auction && props.hand.auction.details && (
          <AuctionTable auction={props.hand.auction} />
        )}

        {/* Dealer & Vulnerability Box */}
        <DealerAndVul hand={props.hand} />

        {/* Hands */}
        {props.playerHoldings && (
          <PlayerHoldings playerHoldings={props.playerHoldings} />
        )}

        {/* Board */}
        <div
          className='absolute flex aspect-square size-32 flex-col items-center justify-center border-4 border-white bg-gray-800 text-lg font-bold text-white'
          style={{ position: 'relative' }}
        >
          <div className='absolute text-xl font-extrabold'>
            {props.hand.board}
          </div>

          {/* Vulnerabilities */}
          {/*<Vulnerabilities vulnerable={props.hand.vulnerable} />*/}

          {/*Played Cards */}
          {props.currentTrickCards && (
            <CurrentTrickCards
              currentLeader={props.currenLeader}
              currentTrickCards={props.currentTrickCards}
            />
          )}
        </div>

        {/* Extra Info */}
        {props.playerHoldings && (
          <PointCountTable playerHoldings={props.playerHoldings} />
        )}
        <Result hand={props.hand} />
        {/*<DDSTable />*/}
      </div>
    </>
  );
}
