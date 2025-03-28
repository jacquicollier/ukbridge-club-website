import BridgeDealPlay from '@/app/components/play/BridgeDealPlay';
import { Board, BoardResult, Contestant } from '@/app/model/constants';
import { ContestantDirection } from '@/app/model/types';
import { RecordOfPlay } from '@/app/api/results/[club]/[game]/recordofplay/RecordOfPlay';
import BridgeTraveller from '@/app/components/play/BridgeTraveller';

export default async function ResultPage({
  params,
}: {
  params: Promise<{ club: string; game: string; contestant: string }>;
}) {
  const { club, game, contestant } = await params;
  const contestantObj = parseContestant(contestant);

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

  function findBoardResult(board: Board): BoardResult {
    return board.results.find((it) => {
      if (!contestantObj) {
        return false;
      }

      if (recordOfPlay.sessionScoreType == 'TWO_WINNER_PAIRS') {
        if (contestantObj.direction === 'NS') {
          return it.boardScore.ns == String(contestantObj.id);
        }

        return it.boardScore.ew == String(contestantObj.id);
      } else {
        if (!contestantObj.direction) {
          return (
            it.boardScore.ns == String(contestantObj.id) ||
            it.boardScore.ew == String(contestantObj.id)
          );
        }
      }

      return false;
    })!;
  }

  return (
    <div className='overflow-auto p-4'>
      {recordOfPlay.sections[0].boards.length > 0 ? (
        <div className='flex flex-row flex-wrap items-start justify-center gap-4'>
          {recordOfPlay.sections[0].boards.map((board, index) => {
            return renderBoard(
              index,
              board,
              findBoardResult(board),
              contestantObj,
            );
          })}
        </div>
      ) : (
        <p className='text-gray-500'>No hands generated yet.</p>
      )}
    </div>
  );
}

function renderBoard(
  index: number,
  board: Board,
  boardResult: BoardResult,
  contestant: Contestant | null,
) {
  if (!boardResult) {
    return null;
  }

  if (board.deal) {
    return (
      <BridgeDealPlay
        key={index}
        board={board}
        boardResult={boardResult}
        players={findPlayers()}
        contestant={contestant}
      />
    );
  }

  return <BridgeTraveller key={index} board={board} contestant={contestant} />;
}

function findPlayers(): Map<ContestantDirection, string[]> {
  return new Map<ContestantDirection, string[]>([
    ['NS', ['Peter Collier', 'Joshua Odawade']],
    ['EW', ['Jacqui Collier', 'David Collier']],
  ]);
}
