import { Direction } from '@/app/model/types';

export default function DealerAndVul(props: {
  dealer: Direction;
  nsVulnerable: boolean;
  ewVulnerable: boolean;
}) {
  function findVulnerability() {
    if (props.nsVulnerable && props.ewVulnerable) {
      return 'Both';
    } else if (props.ewVulnerable) {
      return 'EW';
    } else if (props.nsVulnerable) {
      return 'NS';
    }
    return 'None';
  }

  return (
    <div className='absolute left-1 top-1 rounded-md px-3 py-2 shadow-md'>
      <p>
        Dealer: <span className='font-bold'>{props.dealer}</span>
      </p>
      <p>
        Vul: <span className='font-bold'>{findVulnerability()}</span>
      </p>
    </div>
  );
}
