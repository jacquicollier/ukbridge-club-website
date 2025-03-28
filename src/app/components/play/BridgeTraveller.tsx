import { Board, Contestant } from '@/app/model/constants';
import TravellerHeader from '@/app/components/play/TravellerHeader';
import BoardScores from '@/app/components/hand/board/BoardScores';

export default function BridgeTraveller(props: {
  board: Board;
  contestant: Contestant | null;
}) {
  const boardScores = props.board.results.map((it) => it.boardScore);

  return (
    <div className='relative m-2 flex w-full max-w-[450px] flex-col items-center'>
      <TravellerHeader board={props.board.boardNumber} />
      <BoardScores boardScores={boardScores} contestant={props.contestant} />
    </div>
  );
}
