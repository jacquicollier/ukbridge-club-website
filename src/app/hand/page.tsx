import BridgeHandLayout from '@/app/hand/components/BridgeHandLayout';
import { hands } from '@/app/model/pbn/hands';

export default function Hand() {
  return (
    <div className='flex flex-row flex-wrap'>
      {hands.map((hand, index) => (
        <BridgeHandLayout key={index} hand={hand} result={true} />
      ))}
    </div>
  );
}
