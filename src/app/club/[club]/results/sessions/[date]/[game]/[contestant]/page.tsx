import { Board } from '@/app/club/[club]/results/sessions/[date]/[game]/[contestant]/model';
import TravellerComponent from '@/app/club/[club]/results/sessions/[date]/[game]/[contestant]/components/traveller/TravellerComponent';
import ScoreCardComponent from '@/app/club/[club]/results/sessions/[date]/[game]/[contestant]/components/score-card/ScoreCardComponent';

export default async function ResultPage({
  params,
}: {
  params: Promise<{
    club: string;
    date: string;
    game: string;
    contestant: string;
  }>;
}) {
  const { club, date, game, contestant } = await params;

  const boardsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${club}/results/${date}/${game}/boards`,
  );
  const boards: Board[] = await boardsResponse.json();

  return (
    <div className='overflow-auto p-4'>
      {boards && boards.length > 0 ? (
        <ScoreCardComponent
          club={club}
          date={date}
          game={game}
          contestant={contestant}
          boards={boards}
        />
      ) : (
        <TravellerComponent
          club={club}
          date={date}
          game={game}
          contestant={contestant}
        />
      )}
    </div>
  );
}
