import { Hand, ValueAndDetails } from '@/app/model/pbn/hand';
import AuctionTable from '@/app/hand/components/AuctionTable';
import DealerAndVul from '@/app/hand/components/DealerAndVul';
import PlayerHoldings from '@/app/hand/components/PlayerHoldings';
import CurrentTrickCards from '@/app/hand/components/CurrentTrickCards';
// import PointCountTable from '@/app/hand/components/PointCountTable';
import Result from '@/app/hand/components/Result';
import { Player, PlayerHolding } from '@/app/model/constants';
import DDSTable from '@/app/hand/components/DDSTable';
import BoardScores from '@/app/hand/components/BoardScores';

export default function BridgeBoard(props: {
  hand: Hand;
  result: boolean;
  currentTrickCards?: { [key: string]: { suit: string; rank: string } };
  currenLeader: string | null;
  playerHoldings: Record<Player, PlayerHolding> | null;
  playItAgain: boolean;
  currentPlayer: Player | null;
  showScores: boolean;
  scores: ValueAndDetails | null;
}) {
  const vulnerability = {
    NS: ['NS', 'Both', 'All'].includes(props.hand.vulnerable),
    EW: ['EW', 'Both', 'All'].includes(props.hand.vulnerable),
  };

  return (
    <>
      <div className='relative flex aspect-square w-full max-w-[450px] flex-col items-center justify-center border-2 border-black p-4'>
        {props.showScores && props.scores && (
          <BoardScores scores={props.scores} />
        )}

        {/* Auction Table */}
        {props.hand.auction &&
          !props.playItAgain &&
          props.hand.auction.details && (
            <AuctionTable auction={props.hand.auction} />
          )}

        <DealerAndVul hand={props.hand} />

        {/* Hands */}
        {props.playerHoldings && (
          <PlayerHoldings
            playerHoldings={props.playerHoldings}
            playItAgain={props.playItAgain}
            currentPlayer={props.currentPlayer}
          />
        )}

        {/* Board */}
        <div
          className={`absolute flex aspect-square size-24 flex-col items-center justify-center border-8 md:size-32 ${vulnerability['NS'] ? 'border-y-red-600' : 'border-y-green-600'} ${vulnerability['EW'] ? 'border-x-red-600' : 'border-x-green-600'} bg-gray-800 text-lg font-bold text-white`}
          style={{ position: 'relative' }}
        >
          <div className='absolute text-xl font-extrabold'>
            {props.hand.board}
          </div>

          {/*Played Cards */}
          {props.currentTrickCards && (
            <CurrentTrickCards
              currentLeader={props.currenLeader}
              currentTrickCards={props.currentTrickCards}
            />
          )}
        </div>
        {(() => {
          if (props.playItAgain) {
            return <DDSTable />;
          } else {
            return <Result hand={props.hand} />;
          }
        })()}
      </div>
    </>
  );
}
