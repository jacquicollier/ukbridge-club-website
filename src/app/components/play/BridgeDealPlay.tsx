'use client';

import BridgeBoard from '@/app/components/hand/board/BridgeBoard';
import { useEffect, useState } from 'react';
import BridgePlayPanel from '@/app/components/play/BridgePlayPanel';
import Players from '@/app/components/play/Players';
import { Card, ContestantDirection, Direction } from '@/app/model/types';
import Header from '@/app/components/play/Header';
import { Board, BoardResult } from '@/app/model/constants';
import { determineDealer } from '@/app/model/recordofplay/utils';

export default function BridgeDealPlay(props: {
  board: Board;
  boardResult: BoardResult;
  players: Map<ContestantDirection, string[]>;
}) {
  const [playIndex, setPlayIndex] = useState<number | null>(null);
  const [playedCards, setPlayedCards] = useState<Card[]>([]);
  const [validNextCards, setValidNextCards] = useState<Card[]>([]);
  const [currentTrickCards, setCurrentTrickCards] = useState<
    Partial<{ [key in Direction]: Card }>
  >({});
  const [currentLeader, setCurrentLeader] = useState<Direction>(
    determineDealer(props.board.boardNumber - 1),
  );

  const [playItAgain, setPlayItAgain] = useState<boolean>(false);
  const [showScores, setShowScores] = useState<boolean>(false);

  function getDirectionForCard(
    card: Card,
    hands: { [key in Direction]: Card[] },
  ): Direction | null {
    for (const direction in hands) {
      if (
        hands[direction as Direction].some(
          (c) => c.rank === card.rank && c.suit === card.suit,
        )
      ) {
        return direction as Direction;
      }
    }
    return null;
  }

  useEffect(() => {
    if (props.boardResult?.playedCards) {
      if (playIndex === null) {
        if (playedCards.length !== 0) {
          setPlayedCards([]);
        }
        setCurrentTrickCards({});
        return;
      }

      if (playedCards.length !== playIndex + 1) {
        setPlayedCards(props.boardResult.playedCards.slice(0, playIndex + 1));
      }

      const cardsRemainingInCurrentTrick = playIndex % 4;
      const lastPlayedCard = props.boardResult.playedCards[playIndex];

      if (cardsRemainingInCurrentTrick === 0) {
        setCurrentTrickCards({
          [getDirectionForCard(lastPlayedCard, props.board.deal)!]:
            lastPlayedCard,
        });

        const newLeader = getDirectionForCard(
          lastPlayedCard,
          props.board.deal,
        )!;
        setCurrentLeader(newLeader);
        setValidNextCards(props.board.deal[newLeader]);
      } else {
        setCurrentTrickCards((prev) => ({
          ...prev,
          ...Object.fromEntries(
            playedCards
              .slice(-cardsRemainingInCurrentTrick)
              .map((card) => [
                getDirectionForCard(card, props.board.deal)!,
                card,
              ]),
          ),
        }));

        setValidNextCards(
          props.board.deal[currentLeader].filter(
            (card) =>
              !playedCards.some(
                (playedCard) =>
                  playedCard.rank === card.rank &&
                  playedCard.suit === card.suit,
              ),
          ),
        );
      }
    }
  }, [
    currentLeader,
    playIndex,
    playedCards,
    props.board.deal,
    props.boardResult?.playedCards,
  ]);

  function handleClear(): void {
    setPlayIndex(null);
  }

  function hasPrevious(): boolean {
    return playIndex !== null;
  }

  function handlePreviousCard() {
    if (playIndex !== null) {
      if (playIndex == 0) {
        setPlayIndex(null);
      } else {
        setPlayIndex(playIndex - 1);
      }
    }
  }

  function handleNextCard() {
    setPlayIndex((prev) => (prev == null ? 0 : prev + 1));
  }

  function hasNext(): boolean {
    return (
      props.boardResult?.playedCards !== null &&
      props.boardResult?.playedCards.length !== 0 &&
      (playIndex == null ||
        playIndex < props.boardResult.playedCards.length - 1)
    );
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
        boardResult={props.boardResult}
        currentTrickCards={currentTrickCards}
        currentLeader={currentLeader}
        playedCards={playedCards}
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
