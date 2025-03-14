import { UsebioFile } from '@/app/model/recordofplay/usebio/model';
import MPTable from '@/app/club/[subdomain]/results/sessions/[gameid]/components/MPTable';
import { USEBIORecordOfPlayGenerator } from '@/app/model/recordofplay/usebio/USEBIORecordOfPlayGenerator';

async function getBridgeData() {
  const res = await fetch('http://localhost:3000/api/usebio/mp-pairs'); // Adjust URL for deployment
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default async function ResultPage() {
  const data: UsebioFile = await getBridgeData();
  const recordOfPlay = new USEBIORecordOfPlayGenerator(
    data.USEBIO,
  ).recordOfPlay();

  if (recordOfPlay.sessionScoreType === 'ONE_WINNER_PAIRS') {
    return (
      <div className='flex flex-col gap-y-6 overflow-x-auto p-4 md:px-32'>
        <MPTable scores={recordOfPlay.sessionScores} title='' />
      </div>
    );
  }

  const sessionScores = recordOfPlay.sessionScores;
  const northSouth = sessionScores.filter((a) => a.direction === 'NS');
  const eastWest = sessionScores.filter((a) => a.direction === 'EW');

  return (
    <div className='flex flex-col gap-y-6 overflow-x-auto p-4 md:px-32'>
      <MPTable scores={northSouth} title='North/South' />
      <MPTable scores={eastWest} title='East/West' />
    </div>
  );
}
