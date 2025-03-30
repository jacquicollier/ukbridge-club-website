'use client';

import { SessionScore } from '@/app/api/results/[club]/[game]/recordofplay/score/session/sessionscore';
import { useRouter } from 'next/navigation';

export default function MPTable({
  scores,
  title,
}: {
  scores: SessionScore[];
  title: string;
}) {
  const router = useRouter();

  if (scores.length === 0) {
    return <>No results available.</>;
  }

  const sortedScores = scores.sort((a, b) => {
    if (a.type == 'PAIR_MP' && b.type == 'PAIR_MP') {
      return (
        Number(((b.matchPoints / b.tops) * 100).toFixed(2)) -
        Number(((a.matchPoints / a.tops) * 100).toFixed(2))
      );
    }
    return 0;
  });

  const score = scores[0];

  return (
    <table className='min-w-full table-fixed border-collapse border border-gray-300 shadow-lg'>
      <thead className='w-full text-sm text-white md:text-base'>
        {title && (
          <tr>
            <th
              colSpan={7}
              className='border border-gray-400 bg-gray-600 p-2 text-center'
            >
              {title}
            </th>
          </tr>
        )}
        <tr className='bg-gray-200 text-gray-800'>
          <th className='w-[5%] border border-gray-400 p-1 text-center'>Pos</th>
          <th className='w-[5%] border border-gray-400 p-1 text-center'>No</th>
          <th className='w-[70%] border border-gray-400 p-1 text-center'>
            Players
          </th>
          {score.type === 'PAIR_MP' ? (
            <>
              <th className='w-[5%] border border-gray-400 p-1 text-center'>
                Match Points
              </th>
              <th className='w-[5%] border border-gray-400 p-1 text-center'>
                Tops
              </th>
              <th className='w-[5%] border border-gray-400 p-1 text-center'>
                Score %
              </th>
            </>
          ) : (
            <th>{score.imps}</th>
          )}
          <th className='w-[5%] border border-gray-400 p-1 text-center'>
            Master Points
          </th>
        </tr>
      </thead>

      <tbody className='text-xs md:text-base'>
        {sortedScores.map((score, rowIndex) => (
          <tr
            onClick={() =>
              router.push(
                `${window.location.pathname}/${score.direction ? score.direction + score.contestant : score.contestant}`,
              )
            }
            key={rowIndex}
            className={`cursor-pointer border border-gray-300 ${
              rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <td className='border border-gray-300 p-1 text-center'>
              {score.position}
            </td>
            <td className='border border-gray-300 p-1 text-center'>
              {score.contestant}
            </td>
            <td className='border border-gray-300 p-1'>
              {score.names.map((player, playerIndex) => (
                <span key={playerIndex}>
                  {player}
                  {playerIndex < score.names.length - 1 ? ', ' : ''}
                </span>
              ))}
            </td>
            {score.type === 'PAIR_MP' ? (
              <>
                <td className='border border-gray-300 p-1 text-center'>
                  {score.matchPoints}
                </td>
                <td className='border border-gray-300 p-1 text-center'>
                  {score.tops}
                </td>
                <td className='border border-gray-300 p-1 text-center'>
                  {((score.matchPoints / score.tops) * 100).toFixed(2)}
                </td>
              </>
            ) : (
              <td className='border border-gray-300 p-1 text-center'>
                {score.imps}
              </td>
            )}
            <td className='border border-gray-300 p-1 text-center'>
              {score.masterPoints}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
