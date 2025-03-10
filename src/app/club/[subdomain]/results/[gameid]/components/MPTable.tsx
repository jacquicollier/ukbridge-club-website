import { Pair } from '@/app/model/recordofplay/usebio/model';

export default async function MPTable({
  pairs,
  title,
}: {
  pairs: Pair[];
  title: string;
}) {
  const sortedPairs = pairs.sort((a, b) => Number(a.PLACE) - Number(b.PLACE));

  return (
    <table className='min-w-full table-fixed border-collapse border border-gray-300 shadow-lg'>
      <thead className='w-full text-sm text-white md:text-base'>
        <tr>
          <th
            colSpan={7}
            className='border border-gray-400 bg-gray-600 p-2 text-center'
          >
            {title}
          </th>
        </tr>
        <tr className='bg-gray-200 text-gray-800'>
          <th className='w-[5%] border border-gray-400 p-1 text-center'>Pos</th>
          <th className='w-[5%] border border-gray-400 p-1 text-center'>No</th>
          <th className='w-[70%] border border-gray-400 p-1 text-center'>
            Players
          </th>
          <th className='w-[5%] border border-gray-400 p-1 text-center'>
            Match Points
          </th>
          <th className='w-[5%] border border-gray-400 p-1 text-center'>
            Tops
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
        {sortedPairs.map((pair, rowIndex) => (
          <tr
            key={rowIndex}
            className={`border border-gray-300 ${
              rowIndex % 2 === 0 ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            <td className='border border-gray-300 p-1 text-center'>
              {pair.PLACE}
            </td>
            <td className='border border-gray-300 p-1 text-center'>
              {pair.PAIR_NUMBER}
            </td>
            <td className='border border-gray-300 p-1'>
              {pair.PLAYER.map((player, pairIndex) => (
                <span key={pairIndex}>
                  {player.PLAYER_NAME}
                  {pairIndex < pair.PLAYER.length - 1 ? ', ' : ''}
                </span>
              ))}
            </td>
            <td className='border border-gray-300 p-1 text-center'>100</td>
            <td className='border border-gray-300 p-1 text-center'>200</td>
            <td className='border border-gray-300 p-1 text-center'>
              {pair.PERCENTAGE}
            </td>
            <td className='border border-gray-300 p-1 text-center'>
              {pair.MASTER_POINTS?.MASTER_POINTS_AWARDED}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
