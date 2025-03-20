import { Poi } from '@/app/model/map/types';
import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '@/app/s3';
import { Readable } from 'node:stream';
import { streamToString } from '@/app/api/clubs/utils/s3';

let pois: Poi[] | null = null;

const bucket = 'clubs.ukbridge.club';
const key = 'pois.json';

export async function findPois(): Promise<Poi[]> {
  if (pois !== null) {
    return pois;
  }

  // Fetch data from S3
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const { Body } = await s3.send(command);

  if (!Body) return [];

  // Convert the Body (stream) to a string if it exists
  if (Body instanceof Readable) {
    const fileContent = await streamToString(Body);
    pois = JSON.parse(fileContent) as Poi[];
    return pois;
  } else {
    throw new Error('The body is not a stream.');
  }
}
