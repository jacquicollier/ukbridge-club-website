import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '@/app/s3';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{
      club: string;
      date: string;
      game: string;
      contestant: string;
    }>;
  },
) {
  try {
    const { club, date, game, contestant } = await params;

    const command = new GetObjectCommand({
      Bucket: `${club}.ukbridge.club`,
      Key: `results/${date}/${game}/usebio.xml`,
    });

    const { Body, ContentType } = await s3.send(command);

    return new Response(Body as ReadableStream, {
      headers: {
        'Content-Type': ContentType || 'application/octet-stream', // Fallback if missing
        'Content-Disposition': `attachment; filename="${contestant}"`,
      },
    });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
