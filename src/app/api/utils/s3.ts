import { NextResponse } from 'next/server';
import {
  GetObjectCommand,
  GetObjectCommandOutput,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Readable } from 'node:stream';

const s3 = new S3Client({
  region: process.env.S3_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.S3_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function listFolders<T = string>(
  Bucket: string,
  Prefix: string,
  options: {
    mapFn: (prefix: string) => T;
    reverse: boolean;
  },
): Promise<T[]> {
  const { mapFn, reverse } = options;

  const command = new ListObjectsV2Command({
    Bucket,
    Delimiter: '/',
    Prefix,
  });

  const response = await s3.send(command);

  const folders =
    response.CommonPrefixes?.map((prefix) => mapFn(prefix.Prefix!)) || [];

  return reverse ? folders.reverse() : folders;
}

export async function putObject(
  Bucket: string,
  Key: string,
  file: File,
  Body: Buffer,
): Promise<void> {
  const command = new PutObjectCommand({
    Bucket,
    Key,
    Body,
    ContentType: file.type || 'application/xml',
  });

  await s3.send(command);
}

export async function getAndCacheObject(
  bucket: string,
  key: string,
): Promise<NextResponse> {
  const { Body } = await getObject(bucket, key);
  if (!Body) return NextResponse.json([]);

  // Convert the Body (stream) to a string if it exists
  if (Body instanceof Readable) {
    const fileContent = await streamToString(Body);

    return new NextResponse(fileContent, {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 's-maxage=3600',
      }, // Cache for 1 hour
    });
  } else {
    throw new Error('The body is not a stream.');
  }
}

export async function getAndParseObject<T>(
  Bucket: string,
  Key: string,
  options?: {
    defaultValue?: T;
    parser?: (input: string) => T | Promise<T>;
  },
): Promise<T> {
  const {
    defaultValue = null,
    parser = JSON.parse as (input: string) => T | Promise<T>,
  } = options || {};

  try {
    const { Body } = await getObject(Bucket, Key);

    if (!Body || !(Body instanceof Readable)) {
      return defaultValue as T;
    }

    const fileContent = await streamToString(Body);
    // now handles both sync + async
    return await parser(fileContent);
  } catch (error) {
    console.error('Error reading or parsing S3 object:', error);
    return defaultValue as T;
  }
}

export async function getObject(
  Bucket: string,
  Key: string,
): Promise<GetObjectCommandOutput> {
  return await s3.send(new GetObjectCommand({ Bucket, Key }));
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
