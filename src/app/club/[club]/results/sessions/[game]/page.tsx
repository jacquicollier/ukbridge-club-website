import MPTable from '@/app/club/[club]/results/sessions/[game]/components/MPTable';
import { RecordOfPlay } from '@/app/api/results/[club]/[game]/recordofplay/RecordOfPlay';

export default async function ResultPage({
  params,
}: {
  params: Promise<{ club: string; game: string }>;
}) {
  const { club, game } = await params;

  const apiResponse = await fetch(
    `${process.env.API_URL}/results/${club}/${game}`,
  );
  const recordOfPlay: RecordOfPlay = await apiResponse.json();

  return (
    <div className='flex flex-col gap-y-6 overflow-x-auto p-4 md:px-32'>
      {recordOfPlay.sections.map((section, sectionIndex) => {
        if (recordOfPlay.sessionScoreType === 'ONE_WINNER_PAIRS') {
          return (
            <MPTable
              key={sectionIndex}
              scores={section.sessionScores}
              title={section.name ? `Section ${section.name}` : ''}
            />
          );
        }

        const northSouth = section.sessionScores.filter(
          (score) => score.direction === 'NS',
        );
        const eastWest = section.sessionScores.filter(
          (score) => score.direction === 'EW',
        );

        return (
          <div key={sectionIndex} className='flex flex-col gap-y-6'>
            <MPTable
              scores={northSouth}
              title={
                section.name
                  ? `Section ${section.name} - North/South`
                  : 'North/South'
              }
            />
            <MPTable
              scores={eastWest}
              title={
                section.name
                  ? `Section ${section.name} - East/West`
                  : 'East/West'
              }
            />
          </div>
        );
      })}
    </div>
  );
}
