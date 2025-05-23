import { NextResponse } from 'next/server';
import { listFolders } from '@/app/api/utils/s3';

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: Promise<{ club: string; date: string }>;
  },
) {
  try {
    const { club, date } = await params;

    return NextResponse.json(
      (
        await listFolders(`${club}.ukbridge.club`, `results/${date}/`, {
          mapFn: (prefix: string) => prefix.split('/')[2],
          reverse: false,
        })
      ).map((x) => {
        return {
          title: x.replaceAll('-', ' '),
          date,
          resultsLink: x,
        } as Result;
      }),
    );
  } catch (error: unknown) {
    console.error('Error listing S3 directories:', error);
    return NextResponse.json(
      { error: 'Failed to list directories' },
      { status: 500 },
    );
  }
}

type Result = {
  title: string;
  date: string;
  // realBridgeLink: string | null;
  resultsLink: string;
};
