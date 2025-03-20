import { findInCache } from '@/app/api/clubs/utils/s3';

export async function GET() {
  return await findInCache('clubs.ukbridge.club', 'countries.json');
}
