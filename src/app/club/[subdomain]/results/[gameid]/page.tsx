import { UsebioFile } from '@/app/model/recordofplay/usebio/model';
import MPTable from '@/app/club/[subdomain]/results/[gameid]/components/MPTable';

async function getBridgeData() {
  const res = await fetch('http://localhost:3000/api/usebio/mp-pairs'); // Adjust URL for deployment
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default async function ResultPage() {
  const data: UsebioFile = await getBridgeData();

  const eastWest = [
    ...data.USEBIO.EVENT.SESSION.SECTION.PARTICIPANTS.PAIR,
  ].filter((a) => a.DIRECTION === 'EW');

  const northSouth = [
    ...data.USEBIO.EVENT.SESSION.SECTION.PARTICIPANTS.PAIR,
  ].filter((a) => a.DIRECTION === 'NS');

  return (
    <div>
      <div className='flex flex-col gap-y-6 overflow-x-auto p-4 md:px-32'>
        <MPTable pairs={northSouth} title='North/South' />
        <MPTable pairs={eastWest} title='East/West' />
      </div>
    </div>
  );
}
