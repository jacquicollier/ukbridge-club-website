import { Direction } from '@/app/model/types';

export default function Players(props: {
  players: { [key in Direction]: string };
}) {
  return (
    <div className='flex w-full rounded-t-md bg-gray-100 p-4 shadow-md'>
      {/* First half */}
      <div className='mr-2 flex w-1/2 flex-col rounded-md border-2 border-gray-200 bg-gray-100 p-3 shadow-sm'>
        <p>
          <span className='font-bold'>N:</span> {props.players.N}
        </p>
        <p>
          <span className='font-bold'>S:</span> {props.players.S}
        </p>
      </div>

      {/* Second half */}
      <div className='flex w-1/2 flex-col rounded-md border-2 border-gray-200 bg-gray-100 p-3 shadow-sm'>
        <p>
          <span className='font-bold'>E:</span> {props.players.E}
        </p>
        <p>
          <span className='font-bold'>W:</span> {props.players.W}
        </p>
      </div>
    </div>
  );
}
