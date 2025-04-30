import { TravellerLine } from 'shared/traveller/travellerLine';
import { ContestantId } from 'shared/constants';
import { getResult } from '../../../../../amplify/backend/function/ukbridgeclubprocessresults/lib/utils';

export default function BoardScores(props: {
  boardScores: TravellerLine[];
  contestant: ContestantId | null;
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
            <th className='py-1 text-center'>Result</th>
            {props.boardScores[0].lead && (
              <th className='py-1 text-center'>Lead</th>
            )}
            <th className='py-1 text-center'>Score</th>
            {scoreType === 'PAIR_MP' ? (
              <>
                <th className='py-1 text-center'>NS %</th>
                <th className='py-1 text-center'>EW %</th>
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
  boardScore: TravellerLine,
  contestant: ContestantId | null,
) {
  const highlightLine: boolean = !!(
    contestant &&
    ((contestant.direction == null &&
      (contestant.id == Number(boardScore.ns) ||
        contestant.id == Number(boardScore.ew))) ||
      (contestant.direction == 'EW' &&
        contestant.id == Number(boardScore.ew)) ||
      (contestant.direction == 'NS' && contestant.id == Number(boardScore.ns)))
  );

  return (
    <tr key={index} className={highlightLine ? 'border bg-gray-200' : 'border'}>
      <td className='border text-center'>{boardScore.ns}</td>
      <td className='border text-center'>{boardScore.ew}</td>
      <td className='border text-center'>{getResult(boardScore)}</td>
      {boardScore.lead && (
        <td className='border text-center'>{boardScore.lead}</td>
      )}
      <td className='border text-center'>{boardScore.score}</td>
      {boardScore.type === 'PAIR_MP' ? (
        <>
          <td className='border text-center'>
            {(
              (boardScore.nsMatchPoints /
                (boardScore.nsMatchPoints + boardScore.ewMatchPoints)) *
              100
            ).toFixed(2)}
            %
          </td>
          <td className='border text-center'>
            {(
              (boardScore.ewMatchPoints /
                (boardScore.nsMatchPoints + boardScore.ewMatchPoints)) *
              100
            ).toFixed(2)}
            %
          </td>
        </>
      ) : (
        <td className='border text-center'>{boardScore.imps}</td>
      )}
    </tr>
  );
}
