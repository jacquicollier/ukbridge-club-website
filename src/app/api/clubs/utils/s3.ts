import { NextResponse } from 'next/server';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { Readable } from 'node:stream';

const s3 = new S3Client({
  region: process.env.S3_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function findInCache(
  bucket: string,
  key: string,
): Promise<NextResponse> {
  // const cache = await caches.open('s3-cache');

  // Check if data is already cached
  // const cachedResponse = await cache.match(key);
  // if (cachedResponse) return cachedResponse as NextResponse;

  // Fetch data from S3
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });

  const { Body } = await s3.send(command);

  if (!Body) return NextResponse.json([]);

  // Convert the Body (stream) to a string if it exists
  if (Body instanceof Readable) {
    const fileContent = await streamToString(Body);

    // Store in cache
    const response = new NextResponse(fileContent, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=3600',
      }, // Cache for 1 hour
    });
    // cache.put(key, response.clone());

    return response;
  } else {
    throw new Error('The body is not a stream.');
  }
}

export async function streamToString(stream: Readable): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    stream.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    stream.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf-8')); // Convert the buffer to a string
    });

    stream.on('error', reject);
  });
}
