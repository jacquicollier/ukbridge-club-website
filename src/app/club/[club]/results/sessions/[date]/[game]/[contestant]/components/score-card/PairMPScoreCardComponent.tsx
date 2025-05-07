import {
  Board,
  PairMPScoreCardLine,
} from '@/app/club/[club]/results/sessions/[date]/[game]/[contestant]/model';
import BridgeDealPlay from '@/app/components/play/BridgeDealPlay';

export default function PairMPScoreCardComponent({
  boards,
  pairMPScoreCardLine,
  contestant,
}: {
  boards: Board[];
  pairMPScoreCardLine: PairMPScoreCardLine;
  contestant: string;
}) {
  const isNS = contestant !== pairMPScoreCardLine.ns;

  const matchPoints = isNS
    ? pairMPScoreCardLine.nsMatchPoints
    : pairMPScoreCardLine.ewMatchPoints;
  const totalPoints =
    pairMPScoreCardLine.nsMatchPoints + pairMPScoreCardLine.ewMatchPoints;

  const percentage = Number(((matchPoints / totalPoints) * 100).toFixed(2));
  const backgroundColor = backgroundColour(percentage);

  const board = boards.find(
    (board) => board.boardNumber === pairMPScoreCardLine.board,
  );
  if (board) {
    return (
      <></>
      // <BridgeDealPlay
      //   board={board}
      //   boardResult={boardResult}
      //   players={findPlayers()}
      //   contestant={contestant}
      //   backgroundColor={backgroundColor}
      // />
    );
  }
}

function backgroundColour(percentage: number): string {
  let backgroundColor = 'rgb(209, 213, 219)';

  if (percentage <= 20) {
    // Red for 0% -> 20%
    backgroundColor = 'rgb(255, 0, 0)';
  } else if (percentage <= 40) {
    // Orange for 20% -> 40%
    backgroundColor = 'rgb(255, 165, 0)';
  } else if (percentage <= 60) {
    // Yellow for 40% -> 60%
    backgroundColor = 'rgb(255, 255, 0)';
  } else if (percentage <= 80) {
    // Light Green for 60% -> 80%
    backgroundColor = 'rgb(144, 238, 144)';
  } else {
    // Green for 80% -> 100%
    backgroundColor = 'rgb(0, 255, 0)';
  }

  return backgroundColor;
}
