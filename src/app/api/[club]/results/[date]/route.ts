import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';
import { Result } from '@/app/model/types';

const s3 = new S3Client({
  region: process.env.S3_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.S3_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ club: string; date: string }>;
  },
) {
  try {
    const p = await params;
    const Bucket = `${p.club}.ukbridge.club`;
    const command = new ListObjectsV2Command({
      Bucket,
      Delimiter: '/', // <- important for simulating folders
      Prefix: `results/${p.date}/`, // or use a path like 'somefolder/' to scope it
    });

    const result = await s3.send(command);

    console.log(result);
    // result.CommonPrefixes contains the "directories"
    const folders =
      result.CommonPrefixes?.map((prefix) => prefix.Prefix!.split('/')[2]).map(
        (x) => {
          return {
            title: x.replaceAll('-', ' '),
            date: p.date,
            resultsLink: x,
          } as Result;
        },
      ) || [];

    return NextResponse.json(folders);
  } catch (error: unknown) {
    console.error('Error listing S3 directories:', error);
    return NextResponse.json(
      { error: 'Failed to list directories' },
      { status: 500 },
    );
  }
}
