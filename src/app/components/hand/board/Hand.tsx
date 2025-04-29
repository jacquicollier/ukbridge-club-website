import { Card, Suit } from 'shared/types';
import { rankOrder, SuitMap } from 'shared/constants';
import { Button } from '@aws-amplify/ui-react';

export default function Hand(props: {
  cards: Card[];
  playedCards: Card[];
  playItAgain: boolean;
  validNextCards: Card[];
}) {
  function groupBySuit(cards: Card[]): Record<Suit, Card[]> {
    return cards.reduce(
      (acc, card) => {
        if (!acc[card.suit]) {
          acc[card.suit] = [];
        }
        acc[card.suit].push(card);
        return acc;
      },
      {} as Record<Suit, Card[]>,
    );
  }

  function rankComparator(cardA: Card, cardB: Card): number {
    return rankOrder.indexOf(cardA.rank) - rankOrder.indexOf(cardB.rank);
  }

  return (
    <div className='flex flex-col items-start text-base md:text-lg'>
      {Object.entries(groupBySuit(props.cards)).map(([suit, cards]) => {
        const typedSuit = suit as Suit;
        const sortedCards = cards.sort((a, b) => rankComparator(a, b));

        return (
          <div key={typedSuit} className='flex items-start'>
            <span
              className='font-bold'
              style={{
                color: typedSuit === 'H' || typedSuit === 'D' ? 'red' : 'black',
              }}
            >
              {SuitMap[typedSuit]}
            </span>{' '}
            <div className='ml-2 flex max-w-[80px] flex-wrap md:max-w-[120px]'>
              {sortedCards.map((card) => {
                const isPlayed = props.playedCards.some(
                  (c) => c.rank === card.rank && c.suit === card.suit,
                );
                const cardClass = isPlayed ? 'opacity-25' : '';

                return renderCard(
                  card,
                  cardClass,
                  props.playItAgain,
                  props.validNextCards,
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function renderCard(
  card: Card,
  cardClass: string,
  playItAgain: boolean,
  validNextCards: Card[],
) {
  if (
    playItAgain &&
    validNextCards.some((c) => c.rank === card.rank && c.suit === card.suit)
  ) {
    return (
      <div
        key={`${card.suit}-${card.rank}`}
        className={`flex items-center ${cardClass}`}
      >
        <Button className='border-2 px-1'>{card.rank}</Button>
      </div>
    );
  } else {
    return (
      <div
        key={`${card.suit}-${card.rank}`}
        className={`flex items-center ${cardClass}`}
      >
        <span className='mr-0.5'>{card.rank}</span>
      </div>
    );
  }
}
