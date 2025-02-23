export default function Result(props: {
  contract: string;
  declarer: string;
  result: string;
}) {
  // <div className='absolute left-1 top-1 rounded-md px-3 py-2 shadow-md'>
  //   <p>
  //     Dealer: <span className='font-bold'>{props.hand.dealer}</span>
  //   </p>
  //   <p>
  //     Vul: <span className='font-bold'>{props.hand.vulnerable}</span>
  //   </p>
  // </div>

  return (
    <div className='absolute bottom-2 right-2 rounded-md px-3 py-2 shadow-md'>
      <p>
        Contract: <span className='font-bold'>{props.contract}</span>
      </p>
      <p>
        Declarer: <span className='font-bold'>{props.declarer}</span>
      </p>
      <p>
        Result: <span className='font-bold'>{props.result}</span>
      </p>
    </div>
  );
}
