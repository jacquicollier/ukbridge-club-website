import {
  Board,
  ScoreCard,
} from '@/app/club/[club]/results/sessions/[date]/[game]/[contestant]/model';
import PairMPScoreCardsComponent from '@/app/club/[club]/results/sessions/[date]/[game]/[contestant]/components/score-card/PairMPScoreCardsComponent';

export default async function ScoreCardComponent({
  club,
  date,
  game,
  contestant,
  boards,
}: {
  club: string;
  date: string;
  game: string;
  contestant: string;
  boards: Board[];
}) {
  const scorecardsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${club}/results/${date}/${game}/${contestant}`,
  );
  const scorecards: ScoreCard[] = await scorecardsResponse.json();

  const scorecard = scorecards.find((it) => it.contestant === contestant);

  if (!scorecard) {
    return <>No score card available.</>;
  }

  return scorecard.type === 'PAIR_MP' ? (
    <PairMPScoreCardsComponent
      scorecard={scorecard}
      boards={boards}
      // contestant={contestant}
    />
  ) : null;
}
