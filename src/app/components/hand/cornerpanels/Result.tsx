import { BoardScore } from '@/app/api/results/[club]/[game]/recordofplay/score/board/boardscore';

export default function Result(props: { boardScore: BoardScore }) {
  return (
    <div className='absolute bottom-2 right-2 rounded-md px-3 py-2 text-xs shadow-md md:text-base'>
      <p>
        Contract: <span className='font-bold'>{props.boardScore.contract}</span>
      </p>
      <p>
        Declarer: <span className='font-bold'>{props.boardScore.declarer}</span>
      </p>
      <p>
        Result: <span className='font-bold'>{props.boardScore.tricks}</span>
      </p>
      <p>
        Score: <span className='font-bold'>{props.boardScore.score}</span>
      </p>
      {props.boardScore.type === 'PAIR_MP' ? (
        <>
          <p>
            NS MP:{' '}
            <span className='font-bold'>{props.boardScore.nsMatchPoints}</span>
          </p>
          <p>
            EW MP:{' '}
            <span className='font-bold'>{props.boardScore.ewMatchPoints}</span>
          </p>
        </>
      ) : (
        <p>
          NS IMPs: <span className='font-bold'>{props.boardScore.imps}</span>
        </p>
      )}
    </div>
  );
}
