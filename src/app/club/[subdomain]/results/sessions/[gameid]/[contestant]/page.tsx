import { UsebioFile } from '@/app/model/recordofplay/usebio/model';
import BridgeDealPlay from '@/app/components/play/BridgeDealPlay';
import { USEBIORecordOfPlayGenerator } from '@/app/model/recordofplay/usebio/USEBIORecordOfPlayGenerator';
import { Board, BoardResult, Contestant } from '@/app/model/constants';
import { ContestantDirection } from '@/app/model/types';

async function getBridgeData(gameid: string): Promise<UsebioFile> {
  const res = await fetch(`http://localhost:3000/api/usebio/${gameid}`); // Adjust URL for deployment
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export default async function ContestantResultPage({
  params,
}: {
  params: { gameid: string; contestant: string };
}) {
  const gameid = await params.gameid;
  const contestant = await params.contestant;

  const data: UsebioFile = await getBridgeData(gameid);
  const recordOfPlay = new USEBIORecordOfPlayGenerator(
    data.USEBIO,
  ).recordOfPlay();

  function parseContestant(input: string): Contestant | null {
    const match = input.match(/^(NS|EW)?(\d+)$/);

    if (!match) return null;

    const [, prefix, num] = match;
    return {
      direction: prefix as 'NS' | 'EW' | null,
      id: Number(num),
    };
  }

  function findBoardResult(board: Board, contestantId: string): BoardResult {
    const contestant = parseContestant(contestantId);

    return board.results.find((it) => {
      if (!contestant) {
        return false;
      }

      if (recordOfPlay.sessionScoreType == 'TWO_WINNER_PAIRS') {
        if (contestant?.direction === 'NS') {
          return it.boardScore.ns == String(contestant?.id);
        }

        return it.boardScore.ew == String(contestant?.id);
      } else {
        if (!contestant?.direction) {
          return (
            it.boardScore.ns == String(contestant?.id) ||
            it.boardScore.ew == String(contestant?.id)
          );
        }
      }

      return false;
    })!;
  }

  function findPlayers(): Map<ContestantDirection, string[]> {
    return new Map<ContestantDirection, string[]>([
      ['NS', ['Peter Collier', 'Joshua Odawade']],
      ['EW', ['Jacqui Collier', 'David Collier']],
    ]);
  }

  return (
    <div className='overflow-auto p-4'>
      {recordOfPlay.boards.length > 0 ? (
        <div className='flex flex-row flex-wrap items-center justify-center gap-4'>
          {recordOfPlay.boards.map((board, index) => {
            const boardResult = findBoardResult(board, contestant);
            return boardResult ? (
              <BridgeDealPlay
                key={index}
                board={board}
                boardResult={boardResult}
                players={findPlayers()}
              />
            ) : null;
          })}
        </div>
      ) : (
        <p className='text-gray-500'>No hands generated yet.</p>
      )}
    </div>
  );
}
