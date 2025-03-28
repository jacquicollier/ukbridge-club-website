'use client';

import BridgeBoard from '@/app/components/hand/board/BridgeBoard';
import { useState } from 'react';
import BridgePlayPanel from '@/app/components/play/BridgePlayPanel';
import { ContestantDirection } from '@/app/model/types';
import BridgeDealHeader from '@/app/components/play/BridgeDealHeader';
import { Board, BoardResult, Contestant } from '@/app/model/constants';
import { CardSource } from '@/app/components/hand/board/CardSource';
import { BridgePlay } from '@/app/components/hand/board/BridgePlay';
import BoardScores from '@/app/components/hand/board/BoardScores';

export default function BridgeDealPlay(props: {
  board: Board;
  boardResult: BoardResult;
  players: Map<ContestantDirection, string[]>;
  contestant: Contestant | null;
}) {
  const boardScores = props.board.results.map((it) => it.boardScore);

  const [source] = useState(
    props.boardResult.playedCards
      ? new CardSource(props.boardResult.playedCards)
      : null,
  );
  const [bridgePlay] = useState(
    source ? new BridgePlay('N', source, null) : null,
  );
  // const [validNextCards, setValidNextCards] = useState<Card[]>([]);
  const [playItAgain, setPlayItAgain] = useState<boolean>(false);
  const [showScores, setShowScores] = useState<boolean>(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setRender] = useState(0);
  const forceUpdate = () => setRender((r) => r + 1);

  function handleClear(): void {
    if (bridgePlay) {
      bridgePlay.unplayAll();
      forceUpdate();
    }
  }

  function hasPrevious(): boolean {
    return bridgePlay ? bridgePlay.hasPlayedCards() : false;
  }

  function handlePreviousCard() {
    if (bridgePlay) {
      bridgePlay.unplayLastCard();
      forceUpdate();
    }
  }

  function handleNextCard() {
    if (bridgePlay) {
      bridgePlay.playCard();
      forceUpdate();
    }
  }

  function hasNext(): boolean {
    return bridgePlay ? bridgePlay.hasNextCard() : false;
  }

  return (
    <div className='relative m-2 flex aspect-square w-full max-w-[450px] flex-col items-center'>
      <BridgeDealHeader
        board={props.board.boardNumber}
        playItAgain={playItAgain}
        hasScores={props.board.results.length > 0}
        showScores={showScores}
        setPlayItAgain={setPlayItAgain}
        setShowScores={setShowScores}
      />
      {showScores && boardScores && (
        <BoardScores boardScores={boardScores} contestant={props.contestant} />
      )}
      <BridgeBoard
        board={props.board}
        auction={props.boardResult.auction}
        bridgePlay={bridgePlay}
        boardScore={props.boardResult.boardScore}
        validNextCards={[]}
        playItAgain={playItAgain}
        contestant={props.contestant}
      />
      {props.boardResult?.playedCards !== null && (
        <BridgePlayPanel
          clearPlay={handleClear}
          hasNext={hasNext}
          hasPrevious={hasPrevious}
          nextCard={handleNextCard}
          previousCard={handlePreviousCard}
        />
      )}
    </div>
  );
}
