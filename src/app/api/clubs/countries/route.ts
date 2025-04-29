import { getAndCacheObject } from '@/app/api/clubs/utils/s3';

export async function GET() {
  return await getAndCacheObject('clubs.ukbridge.club', 'countries.json');
}
