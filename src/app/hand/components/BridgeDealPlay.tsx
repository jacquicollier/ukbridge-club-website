'use client';

import BridgeBoard from '@/app/components/hand/board/BridgeBoard';
import { useEffect, useState } from 'react';
import BridgePlayPanel from '@/app/hand/components/BridgePlayPanel';
import { RecordOfPlay } from '@/app/model/recordofplay/RecordOfPlay';
import Players from '@/app/hand/components/Players';
import { Card, Direction } from '@/app/model/types';
import Header from '@/app/hand/components/Header';

export default function BridgeDealPlay(props: {
  recordOfPlay: RecordOfPlay;
  result: boolean;
}) {
  const [playIndex, setPlayIndex] = useState<number | null>(null);
  const [playedCards, setPlayedCards] = useState<Card[]>([]);
  const [validNextCards, setValidNextCards] = useState<Card[]>([]);
  const [currentTrickCards, setCurrentTrickCards] = useState<
    Partial<{ [key in Direction]: Card }>
  >({});
  const [currentLeader, setCurrentLeader] = useState<Direction>(
    props.recordOfPlay.getDeclarer() as Direction,
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
    console.log(playIndex);

    if (playIndex === null) {
      if (playedCards.length !== 0) {
        setPlayedCards([]);
      }
      setCurrentTrickCards({});
      return;
    }

    if (playedCards.length !== playIndex + 1) {
      setPlayedCards(
        props.recordOfPlay.getPlayedCards().slice(0, playIndex + 1),
      );
    }

    const cardsRemainingInCurrentTrick = playIndex % 4;
    const lastPlayedCard = props.recordOfPlay.getPlayedCards()[playIndex];

    if (cardsRemainingInCurrentTrick === 0) {
      setCurrentTrickCards({
        [getDirectionForCard(lastPlayedCard, props.recordOfPlay.getDeal())!]:
          lastPlayedCard,
      });

      const newLeader = getDirectionForCard(
        lastPlayedCard,
        props.recordOfPlay.getDeal(),
      )!;
      setCurrentLeader(newLeader);
      setValidNextCards(props.recordOfPlay.getDeal()[newLeader]);
    } else {
      setCurrentTrickCards((prev) => ({
        ...prev,
        ...Object.fromEntries(
          playedCards
            .slice(-cardsRemainingInCurrentTrick)
            .map((card) => [
              getDirectionForCard(card, props.recordOfPlay.getDeal())!,
              card,
            ]),
        ),
      }));

      setValidNextCards(
        props.recordOfPlay
          .getDeal()
          [
            currentLeader
          ].filter((card) => !playedCards.some((playedCard) => playedCard.rank === card.rank && playedCard.suit === card.suit)),
      );
    }
  }, [currentLeader, playIndex, playedCards, props.recordOfPlay]);

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
      props.recordOfPlay.getPlayedCards().length !== 0 &&
      (playIndex == null ||
        playIndex < props.recordOfPlay.getPlayedCards().length - 1)
    );
  }

  return (
    <div className='relative m-2 flex aspect-square w-full max-w-[450px] flex-col items-center'>
      <Header
        board={props.recordOfPlay.getBoard()}
        playItAgain={playItAgain}
        hasScores={props.recordOfPlay.getScores().length > 0}
        showScores={showScores}
        setPlayItAgain={setPlayItAgain}
        setShowScores={setShowScores}
      />
      <Players players={props.recordOfPlay.getPlayers()} />
      <BridgeBoard
        recordOfPlay={props.recordOfPlay}
        currentTrickCards={currentTrickCards}
        currentLeader={currentLeader}
        playedCards={playedCards}
        validNextCards={validNextCards}
        result={props.result}
        playItAgain={playItAgain}
        showScores={showScores}
      />
      {props.recordOfPlay.getPlayedCards().length > 0 && (
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
