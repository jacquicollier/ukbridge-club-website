import { Direction } from '@/app/model/types';

export default function Result(props: {
  contract: string;
  declarer: Direction;
  result: string;
  score: string;
  scoreImp: string;
}) {
  return (
    <div className='absolute bottom-2 right-2 rounded-md px-3 py-2 text-xs shadow-md md:text-base'>
      <p>
        Contract: <span className='font-bold'>{props.contract}</span>
      </p>
      <p>
        Declarer: <span className='font-bold'>{props.declarer}</span>
      </p>
      <p>
        Result: <span className='font-bold'>{props.result}</span>
      </p>
      <p>
        Score: <span className='font-bold'>{props.score}</span>
      </p>
      {props.scoreImp && (
        <p>
          Score IMP: <span className='font-bold'>{props.scoreImp}</span>
        </p>
      )}
    </div>
  );
}
