import { ContestantDirection } from '@/app/model/types';

export default function Players(props: {
  players: Map<ContestantDirection, string[]>;
}) {
  if (props.players.size !== 2) {
    return <></>;
  }

  return (
    <div className='flex w-full rounded-t-md bg-gray-100 p-4 shadow-md'>
      {Array.from(props.players.entries()).map(([key, value]) => (
        <div
          key={key}
          className='flex w-1/2 flex-col rounded-md border-2 border-gray-200 bg-gray-100 p-3 shadow-sm'
        >
          <p>
            <span className='font-bold'>{key}</span>
          </p>
          <p style={{ whiteSpace: 'pre-line' }}>{value.join('\n')}</p>
        </div>
      ))}
    </div>
  );
}
