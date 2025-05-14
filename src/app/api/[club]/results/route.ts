import { NextResponse } from 'next/server';
import { listFolders, putObject } from '@/app/api/utils/s3';

export async function GET(
  _req: Request,
  {
    params,
  }: {
    params: Promise<{ club: string }>;
  },
) {
  const { club } = await params;

  try {
    return NextResponse.json(
      await listFolders(`${club}.ukbridge.club`, 'results/', {
        mapFn: (prefix: string) => prefix.split('/')[1],
        reverse: true,
      }),
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error occurred while listing folders:', error);
      return Response.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error occurred:', error);
      return Response.json(
        { error: 'An unexpected error occurred' },
        { status: 500 },
      );
    }
  }
}

export async function POST(
  request: Request,
  {
    params,
  }: {
    params: Promise<{ club: string }>;
  },
) {
  const { club } = await params;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return Response.json({ error: 'No file uploaded' }, { status: 400 });
    }

    await putObject(
      `${club}.ukbridge.club`,
      file.name,
      file,
      Buffer.from(await file.arrayBuffer()),
    );
    return Response.json({ message: 'File uploaded successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error occurred while uploading file:', error);
      return Response.json({ error: error.message }, { status: 500 });
    } else {
      console.error('Unknown error occurred:', error);
      return Response.json(
        { error: 'An unexpected error occurred' },
        { status: 500 },
      );
    }
  }
}
