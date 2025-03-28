import {
  BoardScore,
  PairMPBoardScore,
} from '@/app/api/results/[club]/[game]/recordofplay/score/board/boardscore';
import { Contestant } from '@/app/model/constants';
import { getResult } from '@/app/api/results/[club]/[game]/recordofplay/utils';

export default function Result(props: {
  boardScore: BoardScore;
  contestant: Contestant;
}) {
  return (
    <div className='absolute bottom-2 right-2 rounded-md px-3 py-2 text-xs shadow-md md:text-base'>
      <p>
        Result: <span className='font-bold'>{getResult(props.boardScore)}</span>
      </p>
      <p>
        NS Score: <span className='font-bold'>{props.boardScore.score}</span>
      </p>
      {props.boardScore.type === 'PAIR_MP' ? (
        renderMPResult(props.contestant, props.boardScore)
      ) : (
        <p>
          NS IMPs: <span className='font-bold'>{props.boardScore.imps}</span>
        </p>
      )}
    </div>
  );
}

function renderMPResult(contestant: Contestant, boardScore: PairMPBoardScore) {
  const isNS = contestant.id !== Number(boardScore.ew);
  const direction = isNS ? 'NS' : 'EW';
  const matchPoints = isNS
    ? boardScore.nsMatchPoints
    : boardScore.ewMatchPoints;
  const totalPoints = boardScore.nsMatchPoints + boardScore.ewMatchPoints;
  const percentage = ((matchPoints / totalPoints) * 100).toFixed(2);

  // // Calculate the background color based on the percentage with smoother gradient
  // let backgroundColor = '';
  //
  // if (percentage <= 20) {
  //   // Red for 0% -> 20%
  //   backgroundColor = 'rgb(255, 0, 0)';
  // } else if (percentage <= 40) {
  //   // Orange for 20% -> 40%
  //   backgroundColor = 'rgb(255, 165, 0)';
  // } else if (percentage <= 60) {
  //   // Yellow for 40% -> 60%
  //   backgroundColor = 'rgb(255, 255, 0)';
  // } else if (percentage <= 80) {
  //   // Light Green for 60% -> 80%
  //   backgroundColor = 'rgb(144, 238, 144)';
  // } else {
  //   // Green for 80% -> 100%
  //   backgroundColor = 'rgb(0, 255, 0)';
  // }

  return (
    <div>
      <p>
        {direction} %: <span className='font-bold'>{percentage}%</span>
      </p>
    </div>
  );
}
