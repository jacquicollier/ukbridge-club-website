import { Poi } from '@/app/clubs/model/types';
import { getAndParseObject } from '@/app/api/clubs/utils/s3';

let pois: Poi[] | null = null;

export async function findPois(): Promise<Poi[]> {
  if (!pois) {
    pois = await getAndParseObject<Poi[]>('clubs.ukbridge.club', 'pois.json');
  }

  return pois;
}
