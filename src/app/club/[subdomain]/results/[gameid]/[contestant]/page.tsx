import { UsebioFile } from '@/app/model/recordofplay/usebio/model';
import BridgeDealPlay from '@/app/components/play/BridgeDealPlay';
import { USEBIORecordOfPlayGenerator } from '@/app/model/recordofplay/usebio/USEBIORecordOfPlayGenerator';
import Header from '@/app/club/[subdomain]/components/Header';
import { Board, BoardResult } from '@/app/model/constants';
import { ContestantDirection } from '@/app/model/types';

async function getBridgeData() {
  const res = await fetch('http://localhost:3000/api/usebio/mp-pairs'); // Adjust URL for deployment
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default async function ContestantResultPage() {
  const data: UsebioFile = await getBridgeData();
  const recordOfPlay = new USEBIORecordOfPlayGenerator(
    data.USEBIO,
  ).recordOfPlay();

  // const contestant = {
  //   id: 1,
  //   direction: 'NS'
  // } as Contestant;

  function findBoardResult(board: Board): BoardResult {
    return board.results.find((it) => {
      return it.boardScore.ns == '1';
    })!;
  }

  // const boardResult = findBoardResult(board);
  // 'NS': recordOfPlay.players[boardResult.boardScore.ns],
  // 'EW': recordOfPlay.players[boardResult.boardScore.ew],

  function findPlayers(): Map<ContestantDirection, string[]> {
    return new Map<ContestantDirection, string[]>([
      ['NS', ['Peter Collier', 'Joshua Odawade']],
      ['EW', ['Jacqui Collier', 'David Collier']],
    ]);
  }

  return (
    <div>
      <Header />
      <div className='overflow-auto p-4'>
        {recordOfPlay.boards.length > 0 ? (
          <div className='flex flex-row flex-wrap items-center justify-center gap-4'>
            {recordOfPlay.boards.map((board, index) => (
              <BridgeDealPlay
                key={index}
                board={board}
                boardResult={findBoardResult(board)}
                players={findPlayers()}
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
