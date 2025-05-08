import { Traveller } from '@/app/club/[club]/results/sessions/[date]/[game]/[contestant]/model';
import TravellerHeader from '@/app/club/[club]/results/sessions/[date]/[game]/[contestant]/components/traveller/TravellerHeader';
import PairMPTravellerBody from '@/app/club/[club]/results/sessions/[date]/[game]/[contestant]/components/traveller/PairMPTravellerBody';

export default function TravellerBoardComponent({
  traveller,
  contestant,
}: {
  traveller: Traveller;
  contestant: string;
}) {
  return (
    <div className='relative m-2 flex w-full max-w-[450px] flex-col items-center'>
      <TravellerHeader board={traveller.board} />
      {traveller.type === 'PAIR_MP' && (
        <PairMPTravellerBody traveller={traveller} contestant={contestant} />
      )}
    </div>
  );
}
