import { getJSONForClub } from '@/app/api/[club]/utils/utils';

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: Promise<{
      club: string;
      date: string;
      game: string;
    }>;
  },
) {
  const { club, date, game } = await params;
  return getJSONForClub(club, `results/${date}/${game}/travellers.json`);
}
