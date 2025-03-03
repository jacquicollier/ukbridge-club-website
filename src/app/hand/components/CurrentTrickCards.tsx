import CurrentTrickCard from '@/app/hand/components/CurrentTrickCard';

export default function CurrentTrickCards(props: {
  currentLeader: string | null;
  currentTrickCards: { [key: string]: { suit: string; rank: string } };
}) {
  return (
    <>
      {Object.entries(props.currentTrickCards).map(([player, card]) => (
        <CurrentTrickCard
          key={`${player}-${card}`}
          player={player}
          card={card}
          currentLeader={props.currentLeader}
        />
      ))}
    </>
  );
}
