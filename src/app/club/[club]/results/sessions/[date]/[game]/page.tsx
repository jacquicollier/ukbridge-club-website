import {
  Contestant,
  SessionScore,
} from '@/app/club/[club]/results/sessions/[date]/[game]/model';
import MPTable from '@/app/club/[club]/results/sessions/[date]/[game]/components/MPTable';

export default async function ResultPage({
  params,
}: {
  params: Promise<{ club: string; date: string; game: string }>;
}) {
  const { club, date, game } = await params;

  const contestantsResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${club}/results/${date}/${game}/contestants`,
  );
  const contestants: Contestant[] = await contestantsResponse.json();

  const sessionScoresResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${club}/results/${date}/${game}/session-scores`,
  );
  const sessionScores: SessionScore[] = await sessionScoresResponse.json();

  return (
    <div className='flex flex-col gap-y-6 overflow-x-auto p-4 md:px-32'>
      {sessionScores.map((section, index) => {
        return (
          <>
            {section.type === 'PAIR_MP' && (
              <MPTable key={index} score={section} contestants={contestants} />
            )}
          </>
        );
      })}
    </div>
  );
}
