export default function DDSTable() {
  return (
    <div className='absolute bottom-2 right-2 rounded-lg border bg-gray-100 shadow-lg'>
      <table className='w-full border-collapse text-sm'>
        <thead>
          <tr className='border-b'>
            <th className='p-1'>&nbsp;</th>
            <th className='p-1'>♣</th>
            <th className='p-1'>♦</th>
            <th className='p-1'>♥</th>
            <th className='p-1'>♠</th>
            <th className='p-1'>N</th>
          </tr>
        </thead>
        <tbody>
          <tr key={1} className='border-b'>
            <td className='p-1 text-center'>N</td>
            <td className='p-1 text-center'>-</td>
            <td className='p-1 text-center'>-</td>
            <td className='p-1 text-center'>-</td>
            <td className='p-1 text-center'>-</td>
            <td className='p-1 text-center'>-</td>
          </tr>
          <tr key={1} className='border-b'>
            <td className='p-1 text-center'>S</td>
            <td className='p-1 text-center'>-</td>
            <td className='p-1 text-center'>-</td>
            <td className='p-1 text-center'>-</td>
            <td className='p-1 text-center'>-</td>
            <td className='p-1 text-center'>-</td>
          </tr>
          <tr key={1} className='border-b'>
            <td className='p-1 text-center'>E</td>
            <td className='p-1 text-center'>-</td>
            <td className='p-1 text-center'>-</td>
            <td className='p-1 text-center'>-</td>
            <td className='p-1 text-center'>-</td>
            <td className='p-1 text-center'>-</td>
          </tr>
          <tr key={1} className='border-b'>
            <td className='p-1 text-center'>W</td>
            <td className='p-1 text-center'>-</td>
            <td className='p-1 text-center'>-</td>
            <td className='p-1 text-center'>-</td>
            <td className='p-1 text-center'>-</td>
            <td className='p-1 text-center'>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
