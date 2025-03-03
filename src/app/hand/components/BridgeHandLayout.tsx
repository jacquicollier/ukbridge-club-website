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
import { BarChart, Users } from 'lucide-react';
import Switch from 'react-switch';

export default function BridgeHandLayout(props: {
  hand: Hand;
  result: boolean;
}) {
  // TODO: Set this as ref?
  const trickMap = props.hand.play ? mapTricksToLeaders(props.hand) : null;

  // TODO: Set trumps for play it again
  const trumps = determineTrumps(props.hand.contract);

  const [playIndex, setPlayIndex] = useState<number | null>(null);
  const [currentTrickCards, setCurrentTrickCards] = useState<{
    [key: string]: { suit: string; rank: string };
  }>({});
  const [playerHoldings, setPlayerHoldings] = useState<Record<
    Player,
    PlayerHolding
  > | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [currentLeader, setCurrentLeader] = useState<Player | null>(null);
  const [playItAgain, setPlayItAgain] = useState<boolean>(false);
  const [showPlayers, setShowPlayers] = useState<boolean>(false);
  const [showScores, setShowScores] = useState<boolean>(false);

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

    // ✅ Reset leader at trick start
    if (playIndex % 4 === 0) {
      setCurrentPlayer(
        Object.keys(currentTrickCards).length === 4
          ? determineTrickWinner(currentTrickCards, currentLeader!, trumps)
          : (props.hand.play.value as Player),
      );
      setCurrentLeader(currentPlayer);
    }

    // ✅ Rebuild currentTrickCards (only last 4 moves)
    const trickStart = Math.floor(playIndex / 4) * 4; // Get start index of current trick
    const newTrickCards = Object.fromEntries(
      trickMap!
        .slice(trickStart, playIndex + 1)
        .map(({ player, suit, rank }) => [player, { suit, rank }]),
    );
    setCurrentTrickCards(newTrickCards);
  }, [playIndex]);

  useEffect(() => {
    if (playItAgain) {
      setCurrentPlayer(null);
    }
  }, [playItAgain]);

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
      <div className='flex w-full rounded-t-md bg-gray-300 p-3 shadow-md'>
        <div className='flex'>
          <Switch
            title='Play It Again?'
            onChange={() => setPlayItAgain(!playItAgain)}
            checked={playItAgain}
          />
        </div>
        <div className='flex grow justify-center gap-3'>
          <span className='font-bold'>Board {props.hand.board}</span>
        </div>
        <button
          title='Show Players'
          className='flex size-8 items-center justify-center rounded-full bg-gray-200 shadow-md hover:bg-gray-500'
          onClick={() => setShowPlayers(!showPlayers)}
        >
          <Users size={24} />
        </button>
        {props.hand.scoretable && (
          <button
            title='Show Scores'
            className='ml-2 flex size-8 items-center justify-center rounded-full bg-gray-200 shadow-md hover:bg-gray-500'
            onClick={() => setShowScores(!showScores)}
          >
            <BarChart size={24} />
          </button>
        )}
      </div>
      {showPlayers && (
        <div className='flex w-full rounded-t-md bg-gray-100 p-4 shadow-md'>
          {/* First half */}
          <div className='mr-2 flex w-1/2 flex-col rounded-md border-2 border-gray-200 bg-gray-100 p-3 shadow-sm'>
            <p>
              <span className='font-bold'>N:</span> {props.hand.north}
            </p>
            <p>
              <span className='font-bold'>S:</span> {props.hand.south}
            </p>
          </div>

          {/* Second half */}
          <div className='flex w-1/2 flex-col rounded-md border-2 border-gray-200 bg-gray-100 p-3 shadow-sm'>
            <p>
              <span className='font-bold'>E:</span> {props.hand.east}
            </p>
            <p>
              <span className='font-bold'>W:</span> {props.hand.west}
            </p>
          </div>
        </div>
      )}
      <BridgeBoard
        currentTrickCards={currentTrickCards}
        hand={props.hand}
        currenLeader={currentLeader}
        result={props.result}
        playerHoldings={playerHoldings}
        playItAgain={playItAgain}
        currentPlayer={currentPlayer}
        showScores={showScores}
        scores={props.hand.scoretable}
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
