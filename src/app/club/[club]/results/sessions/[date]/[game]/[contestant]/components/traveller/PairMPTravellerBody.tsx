import {
  PairMPLine,
  PairMPTraveller,
} from '@/app/club/[club]/results/sessions/[date]/[game]/[contestant]/model';

export default function PairMPTravellerBody({
  traveller,
  contestant,
}: {
  traveller: PairMPTraveller;
  contestant: string;
}) {
  return (
    <div className='flex w-full text-sm'>
      <table className='w-full'>
        <thead className='bg-gray-400'>
          <tr>
            <th className='py-1 text-center'>NS</th>
            <th className='py-1 text-center'>EW</th>
            <th className='py-1 text-center'>Result</th>
            <th className='py-1 text-center'>Lead</th>
            <th className='py-1 text-center'>Score</th>
            <th className='py-1 text-center'>NS %</th>
            <th className='py-1 text-center'>EW %</th>
          </tr>
        </thead>
        <tbody>
          {traveller.lines
            .sort((it) => it.nsMatchPoints)
            .map((pairMPLine, index) => {
              return renderTravellerLine(index, pairMPLine, contestant);
            })}
        </tbody>
      </table>
    </div>
  );
}

function renderTravellerLine(
  index: number,
  pairMPLine: PairMPLine,
  contestant: string,
) {
  const highlightLine: boolean =
    pairMPLine.ns === contestant || pairMPLine.ew === contestant;

  return (
    <tr key={index} className={highlightLine ? 'border bg-gray-200' : 'border'}>
      <td className='border text-center'>{pairMPLine.ns}</td>
      <td className='border text-center'>{pairMPLine.ew}</td>
      <td className='border text-center'>{pairMPLine.score}</td>
      <td className='border text-center'>{pairMPLine.lead ?? '-'}</td>
      <td className='border text-center'>{pairMPLine.score}</td>
      <td className='border text-center'>
        {(
          (pairMPLine.nsMatchPoints /
            (pairMPLine.nsMatchPoints + pairMPLine.ewMatchPoints)) *
          100
        ).toFixed(2)}
        %
      </td>
      <td className='border text-center'>
        {(
          (pairMPLine.ewMatchPoints /
            (pairMPLine.nsMatchPoints + pairMPLine.ewMatchPoints)) *
          100
        ).toFixed(2)}
        %
      </td>
    </tr>
  );
}
