import { EWVulnerableBoards, NSVulnerableBoards } from '@/app/model/constants';
import { determineDealer } from '@/app/api/[club]/results/[date]/[game]/recordofplay/utils';

export default function DealerAndVul(props: { board: number }) {
  function findVulnerability() {
    const nsVulnerable = NSVulnerableBoards.includes(props.board);
    const ewVulnerable = EWVulnerableBoards.includes(props.board);

    if (nsVulnerable && ewVulnerable) {
      return 'Both';
    } else if (ewVulnerable) {
      return 'EW';
    } else if (nsVulnerable) {
      return 'NS';
    }
    return 'None';
  }

  return (
    <div className='absolute left-1 top-1 rounded-md px-3 py-2 shadow-md'>
      <p>
        Dealer:{' '}
        <span className='font-bold'>{determineDealer(props.board - 1)}</span>
      </p>
      <p>
        Vul: <span className='font-bold'>{findVulnerability()}</span>
      </p>
    </div>
  );
}
