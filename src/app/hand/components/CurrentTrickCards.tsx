import CurrentTrickCard from '@/app/hand/components/CurrentTrickCard';

export default function CurrentTrickCards(props: {
  currentLeader: string;
  currentTrickCards: { [key: string]: { suit: string; rank: string } }; // Cards played by each player
}) {
  return (
    <>
      {Object.entries(props.currentTrickCards).map(([player, card]) => (
        <CurrentTrickCard
          key={player}
          player={player}
          card={card}
          currentLeader={props.currentLeader}
        />
      ))}
    </>
  );
}
