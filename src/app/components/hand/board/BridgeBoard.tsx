import AuctionTable from '@/app/components/hand/cornerpanels/AuctionTable';
import DealerAndVul from '@/app/components/hand/cornerpanels/DealerAndVul';
import Deal from '@/app/components/hand/board/Deal';
import CurrentTrickCards from '@/app/components/hand/board/CurrentTrickCards';
import Result from '@/app/components/hand/cornerpanels/Result';
import DDSTable from '@/app/components/hand/cornerpanels/DDSTable';
import { Card } from '@/app/model/types';
import CollapsiblePanel from '@/app/components/layout/CollapsiblePanel';
import {
  Auction,
  Board,
  Contestant,
  EWVulnerableBoards,
  NSVulnerableBoards,
} from '@/app/model/constants';
import { BridgePlay } from '@/app/components/hand/board/BridgePlay';
import { BoardScore } from '@/app/api/[club]/results/[date]/[game]/recordofplay/score/board/boardscore';
import PointCountTable from '@/app/components/hand/cornerpanels/PointCountTable';

export default function BridgeBoard(props: {
  board: Board;
  auction: Auction | null;
  bridgePlay: BridgePlay | null;
  boardScore: BoardScore;
  validNextCards: Card[];
  playItAgain: boolean;
  contestant: Contestant | null;
}) {
  return (
    <>
      {/* Board Scores */}
      <div className='relative flex aspect-square w-full max-w-[450px] flex-col items-center justify-center border-2 border-black p-4'>
        {/* Auction Table */}
        {!props.playItAgain && props.auction && (
          <CollapsiblePanel>
            <AuctionTable auction={props.auction} />
          </CollapsiblePanel>
        )}

        <DealerAndVul board={props.board.boardNumber} />
        <PointCountTable deal={props.board.deal} />

        {/* Hands */}
        {props.board.deal && (
          <Deal
            deal={props.board.deal}
            playHistory={
              props.bridgePlay ? props.bridgePlay.getPlayHistory() : []
            }
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
          {props.bridgePlay && (
            <CurrentTrickCards
              currentLeader={props.bridgePlay.getCurrentDirection()}
              currentTrickCards={props.bridgePlay.getSlots()}
            />
          )}
        </div>
        {(() => {
          if (props.playItAgain) {
            return <DDSTable deal={props.board.deal} />;
          } else if (props.boardScore && props.contestant) {
            return (
              <Result
                boardScore={props.boardScore}
                contestant={props.contestant}
              />
            );
          }
        })()}
      </div>
    </>
  );
}
