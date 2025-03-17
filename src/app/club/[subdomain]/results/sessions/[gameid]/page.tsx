import { UsebioFile } from '@/app/model/recordofplay/usebio/model';
import MPTable from '@/app/club/[subdomain]/results/sessions/[gameid]/components/MPTable';
import { USEBIORecordOfPlayGenerator } from '@/app/model/recordofplay/usebio/USEBIORecordOfPlayGenerator';

async function getBridgeData(gameid: string) {
  const res = await fetch(`http://localhost:3000/api/usebio/${gameid}`); // Adjust URL for deployment
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default async function ResultPage({
  params,
}: {
  params: Promise<{ gameid: string }>;
}) {
  const { gameid } = await params;

  const data: UsebioFile = await getBridgeData(gameid);
  const recordOfPlay = new USEBIORecordOfPlayGenerator(
    data.USEBIO,
  ).recordOfPlay();

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
