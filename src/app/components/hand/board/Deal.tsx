import { Card, Direction } from '@/app/model/types';
import Hand from '@/app/components/hand/board/Hand';

export default function Deal(props: {
  deal: { [key in Direction]: Card[] };
  playedCards: Card[];
  playItAgain: boolean;
  validNextCards: Card[];
}) {
  const renderHand = (direction: Direction) => (
    <Hand
      cards={props.deal[direction]}
      playedCards={props.playedCards}
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
