import CurrentRoundCard from '@/app/hand/components/CurrentRoundCard';

export default function CurrentRoundCards(props: {
  leadPlayer: string;
  roundPlayedCards: { [key: string]: { suit: string; rank: string } }; // Cards played by each player
}) {
  return (
    <>
      {Object.entries(props.roundPlayedCards).map(([player, card]) => (
        <CurrentRoundCard
          key={player}
          player={player}
          card={card}
          leadPlayer={props.leadPlayer}
        />
      ))}
    </>
  );
}
