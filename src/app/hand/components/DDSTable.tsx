export default function DDSTable() {
  const getSuitClass = (suit: string) =>
    suit === 'H' || suit === 'D' ? 'text-red-500' : 'text-black';

  return (
    <div className='absolute bottom-2 right-2 rounded-lg border bg-gray-100 shadow-lg'>
      <table className='w-full border-collapse text-sm'>
        <thead>
          <tr className='border-b'>
            <th className='p-0.5'>&nbsp;</th>
            <th className={`p-0.5 font-bold ${getSuitClass('C')}`}>♣</th>
            <th className={`p-0.5 font-bold ${getSuitClass('D')}`}>♦</th>
            <th className={`p-0.5 font-bold ${getSuitClass('H')}`}>♥</th>
            <th className={`p-0.5 font-bold ${getSuitClass('S')}`}>♠</th>
            <th className={`p-0.5 font-bold ${getSuitClass('N')}`}>N</th>
          </tr>
        </thead>
        <tbody>
          <tr key={1} className='border-b'>
            <td className='p-0.5 text-center font-bold'>N</td>
            <td className='p-0.5 text-center'>-</td>
            <td className='p-0.5 text-center'>-</td>
            <td className='p-0.5 text-center'>-</td>
            <td className='p-0.5 text-center'>-</td>
            <td className='p-0.5 text-center'>-</td>
          </tr>
          <tr key={1} className='border-b'>
            <td className='p-0.5 text-center font-bold'>S</td>
            <td className='p-0.5 text-center'>-</td>
            <td className='p-0.5 text-center'>-</td>
            <td className='p-0.5 text-center'>-</td>
            <td className='p-0.5 text-center'>-</td>
            <td className='p-0.5 text-center'>-</td>
          </tr>
          <tr key={1} className='border-b'>
            <td className='p-0.5 text-center font-bold'>E</td>
            <td className='p-0.5 text-center'>-</td>
            <td className='p-0.5 text-center'>-</td>
            <td className='p-0.5 text-center'>-</td>
            <td className='p-0.5 text-center'>-</td>
            <td className='p-0.5 text-center'>-</td>
          </tr>
          <tr key={1} className='border-b'>
            <td className='p-0.5 text-center font-bold'>W</td>
            <td className='p-0.5 text-center'>-</td>
            <td className='p-0.5 text-center'>-</td>
            <td className='p-0.5 text-center'>-</td>
            <td className='p-0.5 text-center'>-</td>
            <td className='p-0.5 text-center'>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
