import { Hand } from '@/app/model/pbn/hand';

export default function DealerAndVul(props: { hand: Hand }) {
  return (
    <div className='absolute left-1 top-1 rounded-md px-3 py-2 shadow-md'>
      <p>
        Dealer: <span className='font-bold'>{props.hand.dealer}</span>
      </p>
      <p>
        Vul: <span className='font-bold'>{props.hand.vulnerable}</span>
      </p>
    </div>
  );
}
