import { UsebioFile } from '@/app/model/recordofplay/usebio/model';
import BridgeDealPlay from '@/app/components/play/BridgeDealPlay';
import { USEBIORecordOfPlayGenerator } from '@/app/model/recordofplay/usebio/USEBIORecordOfPlayGenerator';
import Header from '@/app/club/[subdomain]/components/Header';

async function getBridgeData() {
  const res = await fetch('http://localhost:3000/api/usebio/mp-pairs'); // Adjust URL for deployment
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default async function ContestantResultPage() {
  const data: UsebioFile = await getBridgeData();
  const participants = data.USEBIO.EVENT.SESSION.SECTION.PARTICIPANTS;
  const boards = data.USEBIO.EVENT.SESSION.SECTION.BOARD;
  const handset = data.USEBIO.HANDSET;

  return (
    <div>
      <Header />
      <div className='overflow-auto p-4'>
        {boards.length > 0 ? (
          <div className='flex flex-row flex-wrap items-center justify-center gap-4'>
            {boards.map((board, index) => (
              <BridgeDealPlay
                key={index}
                recordOfPlay={new USEBIORecordOfPlayGenerator(
                  board,
                  '1',
                  'NS',
                  participants,
                  handset,
                ).recordOfPlay()}
                result={true}
              />
            ))}
          </div>
        ) : (
          <p className='text-gray-500'>No hands generated yet.</p>
        )}
      </div>
    </div>
  );
}
