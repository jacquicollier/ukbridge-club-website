'use client';

import {
  Contestant,
  PairMPSessionScore,
} from '@/app/club/[club]/results/sessions/[date]/[game]/model';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MPTable({
  score,
  contestants,
}: {
  score: PairMPSessionScore;
  contestants: Contestant[];
}) {
  const pathname = usePathname();

  if (score.lines.length === 0) {
    return <>No results available.</>;
  }

  const sortedScores = score.lines.sort((a, b) => b.percentage - a.percentage);

  return (
    <table className='min-w-full table-fixed border-collapse border border-gray-300 shadow-lg'>
      <thead className='w-full text-sm text-white md:text-base'>
        {score.section && (
          <tr>
            <th
              colSpan={7}
              className='border border-gray-400 bg-gray-600 p-2 text-center'
            >
              {score.section}
            </th>
          </tr>
        )}
        <tr className='bg-gray-200 text-gray-800'>
          <th className='w-[5%] border border-gray-400 p-1 text-center'>Pos</th>
          <th className='w-[5%] border border-gray-400 p-1 text-center'>No</th>
          <th className='w-[70%] border border-gray-400 p-1 text-center'>
            Players
          </th>
          <th className='w-[5%] border border-gray-400 p-1 text-center'>
            Score %
          </th>
          <th className='w-[5%] border border-gray-400 p-1 text-center'>
            Master Points
          </th>
        </tr>
      </thead>

      <tbody className='text-xs md:text-base'>
        {sortedScores.map((score, rowIndex) => (
          <tr
            key={rowIndex}
            className={`cursor-pointer border border-gray-300 ${rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'}`}
          >
            <td className='border border-gray-300 p-1 text-center'>
              <Link
                href={pathname + '/' + score.contestant}
                className='contents'
              >
                <div className='size-full'>{score.position}</div>
              </Link>
            </td>
            <td className='border border-gray-300 p-1 text-center'>
              <Link
                href={pathname + '/' + score.contestant}
                className='contents'
              >
                <div className='size-full'>{score.contestant}</div>
              </Link>
            </td>
            <td className='border border-gray-300 p-1 text-center'>
              <Link
                href={pathname + '/' + score.contestant}
                className='contents'
              >
                <div className='size-full'>
                  {contestants
                    .find((contestant) => {
                      return contestant.id === score.contestant;
                    })
                    ?.names.join(', ')}
                </div>
              </Link>
            </td>
            <td className='border border-gray-300 p-1 text-center'>
              <Link
                href={pathname + '/' + score.contestant}
                className='contents'
              >
                <div className='size-full'>
                  {Number(score.percentage).toFixed(2)}
                </div>
              </Link>
            </td>
            <td className='border border-gray-300 p-1 text-center'>
              <Link
                href={pathname + '/' + score.contestant}
                className='contents'
              >
                <div className='size-full'>{score.masterPoints}</div>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
