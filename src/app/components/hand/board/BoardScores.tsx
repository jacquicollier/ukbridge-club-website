import { BoardScore } from '@/app/api/results/[club]/[game]/recordofplay/score/board/boardscore';
import { Contestant } from '@/app/model/constants';

export default function BoardScores(props: {
  boardScores: BoardScore[];
  contestant: Contestant | null;
}) {
  if (props.boardScores.length === 0) return <p>No scores available.</p>;

  const scoreType = props.boardScores[0].type;

  const sorted = props.boardScores.sort((a, b) => {
    if (a.type == 'PAIR_MP' && b.type == 'PAIR_MP') {
      return b.nsMatchPoints - a.nsMatchPoints;
    }
    if (a.type == 'PAIR_IMP' && b.type == 'PAIR_IMP') {
      return b.imps - a.imps;
    }
    return 0;
  });

  return (
    <div className='flex w-full text-sm'>
      <table className='w-full'>
        <thead className='bg-gray-400'>
          <tr>
            <th className='py-1 text-center'>NS</th>
            <th className='py-1 text-center'>EW</th>
            <th className='py-1 text-center'>Contract</th>
            <th className='py-1 text-center'>Declarer</th>
            {props.boardScores[0].lead && (
              <th className='py-1 text-center'>Lead</th>
            )}
            <th className='py-1 text-center'>Tricks</th>
            <th className='py-1 text-center'>Score</th>
            {scoreType === 'PAIR_MP' ? (
              <>
                <th className='py-1 text-center'>NS MP</th>
                <th className='py-1 text-center'>EW MP</th>
              </>
            ) : (
              <th className='py-1 text-center'>NS IMPs</th>
            )}
          </tr>
        </thead>
        <tbody>
          {sorted.map((boardScore, index) => {
            return renderTravellerLine(index, boardScore, props.contestant);
          })}
        </tbody>
      </table>
    </div>
  );
}

function renderTravellerLine(
  index: number,
  boardScore: BoardScore,
  contestant: Contestant | null,
) {
  const highlightLine: boolean =
    contestant !== null &&
    ((contestant.direction == null &&
      (contestant.id == Number(boardScore.ns) ||
        contestant.id == Number(boardScore.ew))) ||
      (contestant.direction == 'EW' &&
        contestant.id == Number(boardScore.ew)) ||
      (contestant.direction == 'NS' && contestant.id == Number(boardScore.ns)));

  return (
    <tr key={index} className={highlightLine ? 'border bg-gray-200' : 'border'}>
      <td className='border text-center'>{boardScore.ns}</td>
      <td className='border text-center'>{boardScore.ew}</td>
      <td className='border text-center'>{boardScore.contract}</td>
      <td className='border text-center'>{boardScore.declarer}</td>
      {boardScore.lead && (
        <td className='border text-center'>{boardScore.lead}</td>
      )}
      <td className='border text-center'>{boardScore.tricks}</td>
      <td className='border text-center'>{boardScore.score}</td>
      {boardScore.type === 'PAIR_MP' ? (
        <>
          <td className='border text-center'>{boardScore.nsMatchPoints}</td>
          <td className='border text-center'>{boardScore.ewMatchPoints}</td>
        </>
      ) : (
        <td className='border text-center'>{boardScore.imps}</td>
      )}
    </tr>
  );
}
