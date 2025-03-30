'use client';

import BridgeBoard from '@/app/components/hand/board/BridgeBoard';
import { useState } from 'react';
import BridgePlayPanel from '@/app/components/play/BridgePlayPanel';
import { ContestantDirection, Suit } from '@/app/model/types';
import BridgeDealHeader from '@/app/components/play/BridgeDealHeader';
import {
  Board,
  BoardResult,
  Contestant,
  Directions,
} from '@/app/model/constants';
import { CardSource } from '@/app/components/hand/board/CardSource';
import { BridgePlay } from '@/app/components/hand/board/BridgePlay';
import BoardScores from '@/app/components/hand/board/BoardScores';

export default function BridgeDealPlay(props: {
  board: Board;
  boardResult: BoardResult;
  players: Map<ContestantDirection, string[]>;
  contestant: Contestant | null;
  backgroundColor: string;
}) {
  const boardScores = props.board.results.map((it) => it.boardScore);

  const [source] = useState(
    props.boardResult.playedCards
      ? new CardSource(props.boardResult.playedCards)
      : null,
  );
  const [bridgePlay] = useState(
    source
      ? new BridgePlay(
          Directions[
            (Directions.indexOf(props.boardResult.boardScore.declarer!) + 1) % 4
          ],
          source,
          getTrumpSuit(props.boardResult.boardScore.contract),
        )
      : null,
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
        contestant={props.contestant}
        playItAgain={playItAgain}
        boardScore={props.boardResult.boardScore}
        hasScores={props.board.results.length > 0}
        showScores={showScores}
        setPlayItAgain={setPlayItAgain}
        setShowScores={setShowScores}
        backgroundColor={props.backgroundColor}
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

function getTrumpSuit(contract: string): Suit | null {
  // Check for Pass
  if (contract === 'Pass') return null;

  // Check for No Trump (NT)
  if (/^[1-7]N(T)?(x{1,2})?$/.test(contract)) return null;

  // Check for trump suit (S, H, D, C) with optional x/xx
  const match = contract.match(/^[1-7]([SHDC])(x{1,2})?$/);
  if (match) return match[1] as Suit;

  // Invalid contract format
  return null;
}
