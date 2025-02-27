'use client';

import { Hand } from '@/app/model/pbn/hand';
import { Player, PlayerHolding } from '@/app/model/constants';
import BridgeBoard from '@/app/hand/components/BridgeBoard';
import { useEffect, useState } from 'react';
import BridgePlay from '@/app/hand/components/BridgePlay';
import {
  CardAndPlayer,
  determineTrickWinner,
  determineTrumps,
  mapTricksToLeaders,
  parseBridgeHand,
} from '@/app/hand/components/utils';

// TODO: Handle pass

export default function BridgeHandLayout(props: {
  hand: Hand;
  result: boolean;
}) {
  // TODO: Set this as ref?
  const trickMap = mapTricksToLeaders(props.hand);

  const trumps = determineTrumps(props.hand.contract);

  const [playIndex, setPlayIndex] = useState<number | null>(null);
  const [currentTrickCards, setCurrentTrickCards] = useState<{
    [key: string]: { suit: string; rank: string };
  }>({});
  const [playerHoldings, setPlayerHoldings] = useState<
    Record<Player, PlayerHolding>
  >(parseBridgeHand(props.hand.deal));
  const [currentLeader, setCurrentLeader] = useState<Player>(
    props.hand.declarer as Player,
  );

  useEffect(() => {
    if (playIndex === null) return;

    const playedCard = trickMap[playIndex];
    if (!playedCard) return; // No more tricks

    // Reset trick if starting a new one
    if (playIndex % 4 === 0) {
      // Only reset trick if it's necessary (no need to reset if it's already empty)
      setCurrentLeader(
        Object.keys(currentTrickCards).length == 4
          ? determineTrickWinner(currentTrickCards, currentLeader, trumps)
          : (props.hand.play.value as Player),
      );
      setCurrentTrickCards({});
    }

    const currentCard: CardAndPlayer = trickMap[playIndex];

    // Avoid unnecessary state updates if nothing has changed
    setPlayerHoldings((prev) => {
      return {
        ...prev,
        [currentCard.player]: {
          ...prev[currentCard.player],
          [currentCard.suit]: {
            ...prev[currentCard.player as Player][currentCard.suit],
            [currentCard.rank]: true,
          },
        },
      };
    });

    // Avoid unnecessary state updates if no new card has been played
    setCurrentTrickCards((prev) => {
      if (
        prev[currentCard.player]?.rank === currentCard.rank &&
        prev[currentCard.player]?.suit === currentCard.suit
      )
        return prev; // No need to update if card is the same

      return {
        ...prev,
        [currentCard.player]: {
          suit: currentCard.suit,
          rank: currentCard.rank,
        },
      };
    });
  }, [playIndex]); // Add trickMap to dependencies to ensure updates when the map changes

  function handleNextCard() {
    setPlayIndex((prev) => (prev == null ? 0 : prev + 1));
  }

  function hasNext(): boolean {
    return playIndex == null || playIndex < trickMap.length - 1;
  }

  // function handlePreviousCard() {
  //   if (playIndex !== null) {
  //     if (playIndex == 0) {
  //       setPlayIndex(null);
  //     } else {
  //       setPlayIndex(playIndex - 1);
  //     }
  //   }
  // }

  return (
    <div className='relative m-2 flex aspect-square w-full max-w-[450px] flex-col items-center'>
      <BridgeBoard
        currentTrickCards={currentTrickCards}
        hand={props.hand}
        currenLeader={currentLeader}
        result={props.result}
        playerHoldings={playerHoldings}
      />
      {props.hand.contract !== 'Pass' && (
        <BridgePlay hasNext={hasNext} nextCard={handleNextCard} />
      )}
    </div>
  );
}
