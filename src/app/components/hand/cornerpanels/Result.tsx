export default function Result() {
  return <></>;
  // const isNS = props.contestant.id !== Number(props.boardScore.ew);
  //
  // return (
  //   <div className='absolute bottom-2 right-2 rounded-md px-3 py-2 text-xs shadow-md md:text-base'>
  //     <p>
  //       Result: <span className='font-bold'>{getResult(props.boardScore)}</span>
  //     </p>
  //     <p>
  //       {isNS ? 'NS' : 'EW'} Score:{' '}
  //       <span className='font-bold'>
  //         {isNS ? props.boardScore.score : -Number(props.boardScore.score)}
  //       </span>
  //     </p>
  //     {props.boardScore.type === 'PAIR_MP' ? (
  //       renderMPResult(isNS, props.boardScore)
  //     ) : (
  //       <p>
  //         NS IMPs: <span className='font-bold'>{props.boardScore.imps}</span>
  //       </p>
  //     )}
  //   </div>
  // );
}

// function renderMPResult(isNS: boolean, boardScore: PairMPTravellerLine) {
//   const direction = isNS ? 'NS' : 'EW';
//   const matchPoints = isNS
//     ? boardScore.nsMatchPoints
//     : boardScore.ewMatchPoints;
//   const totalPoints = boardScore.nsMatchPoints + boardScore.ewMatchPoints;
//   const percentage = ((matchPoints / totalPoints) * 100).toFixed(2);
//
//   return (
//     <div>
//       <p>
//         {direction} %: <span className='font-bold'>{percentage}%</span>
//       </p>
//     </div>
//   );
// }
