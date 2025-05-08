import { putObject } from '@/app/api/utils/s3';
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
  return getJSONForClub(club, `results/${date}/${game}/session-scores.json`);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ club: string; game: string }> },
) {
  const { club, game } = await params;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return Response.json({ error: 'No file uploaded' }, { status: 400 });
    }

    await putObject(
      process.env.AWS_S3_BUCKET_NAME!,
      `${club}/${game}/${file.name.endsWith('.xml') ? 'usebio.xml' : 'hands.pbn'}`,
      file,
      Buffer.from(await file.arrayBuffer()),
    );
    return Response.json({ message: 'File uploaded successfully' });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Error occurred while uploading file:', error);
      return Response.json({ error: error.message }, { status: 500 });
    } else {
      // Handle the case where the error is not an instance of Error (like a network issue)
      console.error('Unknown error occurred:', error);
      return Response.json(
        { error: 'An unexpected error occurred' },
        { status: 500 },
      );
    }
  }
}
