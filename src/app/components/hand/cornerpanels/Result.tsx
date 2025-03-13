import { BoardResult } from '@/app/model/constants';

export default function Result(props: { boardResult: BoardResult }) {
  const boardScore = props.boardResult.boardScore;

  return (
    <div className='absolute bottom-2 right-2 rounded-md px-3 py-2 text-xs shadow-md md:text-base'>
      <p>
        Contract: <span className='font-bold'>{boardScore.contract}</span>
      </p>
      <p>
        Declarer: <span className='font-bold'>{boardScore.declarer}</span>
      </p>
      <p>
        Result: <span className='font-bold'>{boardScore.tricks}</span>
      </p>
      <p>
        Score: <span className='font-bold'>{boardScore.score}</span>
      </p>
      {boardScore.type === 'PAIR_MP' ? (
        <>
          <p>
            NS MP: <span className='font-bold'>{boardScore.nsMatchPoints}</span>
          </p>
          <p>
            EW MP: <span className='font-bold'>{boardScore.ewMatchPoints}</span>
          </p>
        </>
      ) : (
        <p>
          NS IMPs: <span className='font-bold'>{boardScore.imps}</span>
        </p>
      )}
    </div>
  );
}
