import BridgeDealPlay from '@/app/components/play/BridgeDealPlay';
import { Board, BoardResult, Contestant } from '@/app/model/constants';
import { ContestantDirection } from '@/app/model/types';
import { RecordOfPlay } from '@/app/api/results/[club]/[game]/recordofplay/RecordOfPlay';

export default async function ResultPage({
  params,
}: {
  params: Promise<{ club: string; game: string; contestant: string }>;
}) {
  const { club, game, contestant } = await params;

  const apiResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/results/${club}/${game}`,
  );
  const recordOfPlay: RecordOfPlay = await apiResponse.json();

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
      {recordOfPlay.sections[0].boards.length > 0 ? (
        <div className='flex flex-row flex-wrap items-center justify-center gap-4'>
          {recordOfPlay.sections[0].boards.map((board, index) => {
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
