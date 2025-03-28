import Switch from 'react-switch';
import { BarChart } from 'lucide-react';

export default function BridgeDealHeader(props: {
  board: number;
  playItAgain: boolean;
  hasScores: boolean;
  showScores: boolean;
  setPlayItAgain: (playItAgain: boolean) => void;
  setShowScores: (showScores: boolean) => void;
}) {
  return (
    <div className='flex w-full rounded-t-md bg-gray-300 p-3 shadow-md'>
      <div className='flex'>
        <Switch
          title='Play It Again?'
          onChange={() => props.setPlayItAgain(!props.playItAgain)}
          checked={props.playItAgain}
        />
      </div>
      <div className='flex grow justify-center gap-3'>
        <span className='font-bold'>Board {props.board}</span>
      </div>
      {props.hasScores && (
        <button
          title='Show Scores'
          className='ml-2 flex size-8 items-center justify-center rounded-full bg-gray-200 shadow-md hover:bg-gray-500'
          onClick={() => props.setShowScores(!props.showScores)}
        >
          <BarChart size={24} />
        </button>
      )}
    </div>
  );
}
