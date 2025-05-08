import {
  Board,
  PairMPScoreCard,
} from '@/app/club/[club]/results/sessions/[date]/[game]/[contestant]/model';
import PairMPScoreCardComponent from '@/app/club/[club]/results/sessions/[date]/[game]/[contestant]/components/score-card/PairMPScoreCardComponent';

export default function PairMPScoreCardsComponent({
  scorecard,
  boards,
  // contestant,
}: {
  scorecard: PairMPScoreCard;
  boards: Board[];
  // contestant: string;
}) {
  if (scorecard.lines.length === 0) {
    return <>No results available.</>;
  }

  return (
    <div className='overflow-auto p-4'>
      <div className='flex flex-row flex-wrap items-start justify-center gap-4'>
        {scorecard.lines.map((pairMPScoreCardLine, index) => {
          return (
            <PairMPScoreCardComponent
              key={index}
              boards={boards}
              pairMPScoreCardLine={pairMPScoreCardLine}
              // contestant={contestant}
            />
          );
        })}
      </div>
    </div>
  );
}
