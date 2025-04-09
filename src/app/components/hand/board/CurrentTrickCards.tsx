import CurrentTrickCard from '@/app/components/hand/board/CurrentTrickCard';
import { Card, Direction } from '@/app/model/types';

export default function CurrentTrickCards(props: {
  currentLeader: Direction;
  currentTrickCards: Partial<{ [key in Direction]: Card }>;
}) {
  return (
    <>
      {Object.entries(props.currentTrickCards).map(
        ([player, card]) =>
          card && (
            <CurrentTrickCard
              key={`${player}-${card}`}
              player={player as Direction}
              card={card}
              currentLeader={props.currentLeader}
            />
          ),
      )}
    </>
  );
}
