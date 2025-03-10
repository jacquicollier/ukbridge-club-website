export default function BoardScores(props: {
  headings: string[];
  scores: string[][];
}) {
  return (
    <div className='absolute inset-4 z-20 size-[calc(100%-2rem)] overflow-scroll border border-black bg-white text-sm'>
      <table>
        <thead>
          <tr>
            {props.headings.map((key) => (
              <th key={key} className='py-1 text-center'>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.scores.map((row, index) => {
            return (
              <tr key={index} className='border'>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} className='border'>
                    {cell}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
