import PlayedCard from '@/app/hand/components/PlayedCard';

export default function PlayedCards(props: {
  declarer: string;
  playedCards: { [key: string]: { suit: string; rank: string } }; // Cards played by each player
}) {
  return (
    <>
      {Object.entries(props.playedCards).map(([player, card]) => (
        <PlayedCard
          key={player}
          player={player}
          card={card}
          leadPlayer={props.declarer}
        />
      ))}
    </>
  );
}
