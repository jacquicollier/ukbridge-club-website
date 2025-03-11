import { BoardScore } from '@/app/model/recordofplay/score/board/boardscore';

export default function BoardScores(props: { boardScores: BoardScore[] }) {
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
    <div className='absolute inset-4 z-20 size-[calc(100%-2rem)] overflow-scroll border border-black bg-white text-sm'>
      <table>
        <thead>
          <tr>
            <th className='py-1 text-center'>NS</th>
            <th className='py-1 text-center'>EW</th>
            <th className='py-1 text-center'>Contract</th>
            <th className='py-1 text-center'>Declarer</th>
            <th className='py-1 text-center'>Lead</th>
            <th className='py-1 text-center'>Tricks</th>
            <th className='py-1 text-center'>Score</th>
            {scoreType === 'PAIR_MP' ? (
              <>
                <th>NS MP</th>
                <th>EW MP</th>
              </>
            ) : (
              <th>NS IMPs</th>
            )}
          </tr>
        </thead>
        <tbody>
          {sorted.map((boardScore, index) => {
            return (
              <tr key={index} className='border'>
                <td className='border'>{boardScore.ns}</td>
                <td className='border'>{boardScore.ew}</td>
                <td className='border'>{boardScore.contract}</td>
                <td className='border'>{boardScore.declarer}</td>
                <td className='border'>{boardScore.lead}</td>
                <td className='border'>{boardScore.tricks}</td>
                <td className='border'>{boardScore.score}</td>
                {boardScore.type === 'PAIR_MP' ? (
                  <>
                    <th>{boardScore.nsMatchPoints}</th>
                    <th>{boardScore.ewMatchPoints}</th>
                  </>
                ) : (
                  <th>{boardScore.imps}</th>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
