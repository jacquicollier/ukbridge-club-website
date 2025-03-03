import { Hand } from '@/app/model/pbn/hand';

export default function Result(props: { hand: Hand }) {
  return (
    <div className='absolute bottom-2 right-2 rounded-md px-3 py-2 shadow-md'>
      <p>
        Contract: <span className='font-bold'>{props.hand.contract}</span>
      </p>
      <p>
        Declarer: <span className='font-bold'>{props.hand.declarer}</span>
      </p>
      <p>
        Result: <span className='font-bold'>{props.hand.result}</span>
      </p>
      <p>
        Score: <span className='font-bold'>{props.hand.score}</span>
      </p>
      {props.hand.scoreimp && (
        <p>
          Score IMP: <span className='font-bold'>{props.hand.scoreimp}</span>
        </p>
      )}
    </div>
  );
}
