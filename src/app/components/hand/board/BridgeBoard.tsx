import AuctionTable from '@/app/components/hand/cornerpanels/AuctionTable';
import DealerAndVul from '@/app/components/hand/cornerpanels/DealerAndVul';
import Deal from '@/app/components/hand/board/Deal';
import CurrentTrickCards from '@/app/components/hand/board/CurrentTrickCards';
// import PointCountTable from '@/app/hand/components/PointCountTable';
import Result from '@/app/components/hand/cornerpanels/Result';
import DDSTable from '@/app/components/hand/cornerpanels/DDSTable';
import BoardScores from '@/app/components/hand/cornerpanels/BoardScores';
import { Card, Direction } from '@/app/model/types';
import CollapsiblePanel from '@/app/components/layout/CollapsiblePanel';
import { RecordOfPlay } from '@/app/model/recordofplay/RecordOfPlay';
import { EWVulnerableBoards, NSVulnerableBoards } from '@/app/model/constants';

export default function BridgeBoard(props: {
  recordOfPlay: RecordOfPlay;
  currentTrickCards: Partial<{ [key in Direction]: Card }>;
  currentLeader: Direction;
  playedCards: Card[];
  validNextCards: Card[];
  result: boolean;
  playItAgain: boolean;
  showScores: boolean;
}) {
  return (
    <>
      <div className='relative flex aspect-square w-full max-w-[450px] flex-col items-center justify-center border-2 border-black p-4'>
        {props.showScores && props.recordOfPlay.scores && (
          <BoardScores
            headings={props.recordOfPlay.scoreHeadings}
            scores={props.recordOfPlay.scores}
          />
        )}

        {/* Auction Table */}
        {!props.playItAgain &&
          props.recordOfPlay.bids &&
          props.recordOfPlay.bids.length > 0 && (
            <CollapsiblePanel>
              <AuctionTable
                opener={props.recordOfPlay.opener}
                bids={props.recordOfPlay.bids!}
              />
            </CollapsiblePanel>
          )}

        <DealerAndVul board={props.recordOfPlay.board} />

        {/* Hands */}
        {props.recordOfPlay.deal && (
          <Deal
            deal={props.recordOfPlay.deal}
            playedCards={props.playedCards}
            playItAgain={props.playItAgain}
            validNextCards={props.validNextCards}
          />
        )}

        {/* Board */}
        <div
          className={`absolute flex aspect-square size-24 flex-col items-center justify-center border-8 md:size-32 ${NSVulnerableBoards.includes(props.recordOfPlay.board) ? 'border-y-red-600' : 'border-y-green-600'} ${EWVulnerableBoards.includes(props.recordOfPlay.board) ? 'border-x-red-600' : 'border-x-green-600'} bg-gray-800 text-lg font-bold text-white`}
          style={{ position: 'relative' }}
        >
          <div className='absolute text-xl font-extrabold'>
            {props.recordOfPlay.board}
          </div>

          {/*Played Cards */}
          <CurrentTrickCards
            currentLeader={props.currentLeader}
            currentTrickCards={props.currentTrickCards}
          />
        </div>
        {(() => {
          if (props.playItAgain) {
            return <DDSTable />;
          } else {
            return (
              <Result
                contract={props.recordOfPlay.contract}
                declarer={props.recordOfPlay.declarer}
                result={props.recordOfPlay.result}
                score={props.recordOfPlay.score}
                scoreImp={props.recordOfPlay.scoreImp}
              />
            );
          }
        })()}
      </div>
    </>
  );
}
