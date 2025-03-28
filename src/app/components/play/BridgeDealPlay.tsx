'use client';

import BridgeBoard from '@/app/components/hand/board/BridgeBoard';
import { useState } from 'react';
import BridgePlayPanel from '@/app/components/play/BridgePlayPanel';
import Players from '@/app/components/play/Players';
import { Card, ContestantDirection } from '@/app/model/types';
import Header from '@/app/components/play/Header';
import { Board, BoardResult } from '@/app/model/constants';
import { CardSource } from '@/app/components/hand/board/CardSource';
import { BridgePlay } from '@/app/components/hand/board/BridgePlay';

export default function BridgeDealPlay(props: {
  board: Board;
  boardResult: BoardResult;
  players: Map<ContestantDirection, string[]>;
}) {
  const [source] = useState(
    props.boardResult.playedCards
      ? new CardSource(props.boardResult.playedCards)
      : null,
  );
  const [bridgePlay] = useState(
    source ? new BridgePlay('N', source, null) : null,
  );
  const [validNextCards, setValidNextCards] = useState<Card[]>([]);
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
      <Header
        board={props.board.boardNumber}
        playItAgain={playItAgain}
        hasScores={props.board.results.length > 0}
        showScores={showScores}
        setPlayItAgain={setPlayItAgain}
        setShowScores={setShowScores}
      />
      <Players players={props.players} />
      <BridgeBoard
        board={props.board}
        auction={props.boardResult.auction}
        bridgePlay={bridgePlay}
        boardScore={props.boardResult.boardScore}
        validNextCards={validNextCards}
        playItAgain={playItAgain}
        showScores={showScores}
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
