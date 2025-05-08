import Hand from '@/app/components/hand/board/Hand';
import { Card, Direction } from '@/app/components/hand/board/model';

export default function Deal(props: {
  deal: { [key in Direction]: Card[] };
  playHistory: { direction: Direction; card: Card }[];
  playItAgain: boolean;
  validNextCards: Card[];
}) {
  function getPlayHistory(direction: Direction): Card[] {
    return props.playHistory
      .filter((play) => play.direction === direction)
      .map((play) => play.card);
  }

  const renderHand = (direction: Direction) => (
    <Hand
      cards={props.deal[direction]}
      playedCards={getPlayHistory(direction)}
      playItAgain={props.playItAgain}
      validNextCards={props.validNextCards}
    />
  );

  return (
    <>
      <div className='absolute top-2'>{renderHand('N')}</div>
      <div className='absolute left-2 top-1/2 -translate-y-1/2'>
        {renderHand('W')}
      </div>
      <div className='absolute right-2 top-1/2 -translate-y-1/2'>
        {renderHand('E')}
      </div>
      <div className='absolute bottom-2'>{renderHand('S')}</div>
    </>
  );
}
