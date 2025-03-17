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
import {
  Board,
  BoardResult,
  EWVulnerableBoards,
  NSVulnerableBoards,
} from '@/app/model/constants';

export default function BridgeBoard(props: {
  board: Board;
  boardResult: BoardResult;
  currentTrickCards: Partial<{ [key in Direction]: Card }>;
  currentLeader: Direction;
  playedCards: Card[];
  validNextCards: Card[];
  playItAgain: boolean;
  showScores: boolean;
}) {
  const boardScores = props.board.results.map((it) => it.boardScore);

  return (
    <>
      {/* Board Scores */}
      <div className='relative flex aspect-square w-full max-w-[450px] flex-col items-center justify-center border-2 border-black p-4'>
        {props.showScores && boardScores && (
          <BoardScores boardScores={boardScores} />
        )}

        {/* Auction Table */}
        {!props.playItAgain && props.boardResult?.auction && (
          <CollapsiblePanel>
            <AuctionTable auction={props.boardResult.auction} />
          </CollapsiblePanel>
        )}

        <DealerAndVul board={props.board.boardNumber} />

        {/* Hands */}
        {props.board.deal && (
          <Deal
            deal={props.board.deal}
            playedCards={props.playedCards}
            playItAgain={props.playItAgain}
            validNextCards={props.validNextCards}
          />
        )}

        {/* Board */}
        <div
          className={`absolute flex aspect-square size-24 flex-col items-center justify-center border-8 md:size-32 ${NSVulnerableBoards.includes(props.board.boardNumber % 16) ? 'border-y-red-600' : 'border-y-green-600'} ${EWVulnerableBoards.includes(props.board.boardNumber % 16) ? 'border-x-red-600' : 'border-x-green-600'} bg-gray-800 text-lg font-bold text-white`}
          style={{ position: 'relative' }}
        >
          <div className='absolute text-xl font-extrabold'>
            {props.board.boardNumber}
          </div>

          {/*Played Cards */}
          <CurrentTrickCards
            currentLeader={props.currentLeader}
            currentTrickCards={props.currentTrickCards}
          />
        </div>
        {(() => {
          if (props.playItAgain) {
            return <DDSTable deal={props.board.deal} />;
          } else if (props.boardResult) {
            return <Result boardResult={props.boardResult} />;
          }
        })()}
      </div>
    </>
  );
}
