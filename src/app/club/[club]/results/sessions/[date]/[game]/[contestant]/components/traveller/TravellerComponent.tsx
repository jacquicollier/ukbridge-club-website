import { Traveller } from '@/app/club/[club]/results/sessions/[date]/[game]/[contestant]/model';
import TravellerBoardComponent from '@/app/club/[club]/results/sessions/[date]/[game]/[contestant]/components/traveller/TravellerBoardComponent';

export default async function TravellerComponent({
  club,
  date,
  game,
  contestant,
}: {
  club: string;
  date: string;
  game: string;
  contestant: string;
}) {
  const travellersResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/${club}/results/${date}/${game}/travellers`,
  );
  const travellers: Traveller[] = await travellersResponse.json();

  if (!travellers) {
    return <>No travellers available.</>;
  }

  return travellers.map((traveller, index) => (
    <TravellerBoardComponent
      key={index}
      traveller={traveller}
      contestant={contestant}
    />
  ));
}
