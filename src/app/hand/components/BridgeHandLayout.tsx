'use client';

import { Hand } from '@/app/model/pbn/hand';
import { Player, PlayerHolding } from '@/app/model/constants';
import BridgeBoard from '@/app/hand/components/BridgeBoard';
import { useEffect, useState } from 'react';
import BridgePlay from '@/app/hand/components/BridgePlay';
import {
  determineTrickWinner,
  determineTrumps,
  mapTricksToLeaders,
  parseBridgeHand,
} from '@/app/hand/components/utils';
import { Users } from 'lucide-react';

export default function BridgeHandLayout(props: {
  hand: Hand;
  result: boolean;
}) {
  // TODO: Set this as ref?
  const trickMap = props.hand.play ? mapTricksToLeaders(props.hand) : null;

  const trumps = determineTrumps(props.hand.contract);

  const [playIndex, setPlayIndex] = useState<number | null>(null);
  const [currentTrickCards, setCurrentTrickCards] = useState<{
    [key: string]: { suit: string; rank: string };
  }>({});
  const [playerHoldings, setPlayerHoldings] = useState<Record<
    Player,
    PlayerHolding
  > | null>(null);
  const [currentLeader, setCurrentLeader] = useState<Player | null>(null);

  useEffect(() => {
    setCurrentTrickCards({});
    setPlayerHoldings(parseBridgeHand(props.hand.deal));
    setCurrentLeader(props.hand.declarer as Player);
  }, [props.hand]);

  useEffect(() => {
    if (playIndex === null) {
      setCurrentTrickCards({});
      setPlayerHoldings(parseBridgeHand(props.hand.deal)); // Reset to initial state
      setCurrentLeader(props.hand.declarer as Player);
      return;
    }

    // ✅ Get all cards played up to `playIndex`
    const playedCards = trickMap!.slice(0, playIndex + 1);

    // ✅ Rebuild playerHoldings based on playedCards
    const newPlayerHoldings = parseBridgeHand(props.hand.deal);
    playedCards.forEach(({ player, suit, rank }) => {
      newPlayerHoldings[player][suit][rank] = true; // Mark as played
    });
    setPlayerHoldings(newPlayerHoldings);

    // ✅ Rebuild currentTrickCards (only last 4 moves)
    const trickStart = Math.floor(playIndex / 4) * 4; // Get start index of current trick
    const newTrickCards = Object.fromEntries(
      trickMap!
        .slice(trickStart, playIndex + 1)
        .map(({ player, suit, rank }) => [player, { suit, rank }]),
    );
    setCurrentTrickCards(newTrickCards);

    // ✅ Reset leader at trick start
    if (playIndex % 4 === 0) {
      setCurrentLeader(
        Object.keys(newTrickCards).length === 4
          ? determineTrickWinner(newTrickCards, currentLeader!, trumps)
          : (props.hand.play.value as Player),
      );
    }
  }, [playIndex]);

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
      trickMap !== null &&
      (playIndex == null || playIndex < trickMap.length - 1)
    );
  }

  return (
    <div className='relative m-2 flex aspect-square w-full max-w-[450px] flex-col items-center'>
      <div className='flex w-full items-center justify-between rounded-t-md bg-gray-300 p-3 shadow-md'>
        <div className='flex grow justify-center gap-3'>
          <span className='font-bold'>Board {props.hand.board}</span>
        </div>
        {/* Clear Button on the Right */}
        <button
          title='Clear'
          className='flex size-8 items-center justify-center rounded-full bg-gray-200 shadow-md hover:bg-gray-500'
        >
          <Users size={24} />
        </button>
      </div>
      <BridgeBoard
        currentTrickCards={currentTrickCards}
        hand={props.hand}
        currenLeader={currentLeader}
        result={props.result}
        playerHoldings={playerHoldings}
      />
      {props.hand.play && props.hand.contract !== 'Pass' && (
        <BridgePlay
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
