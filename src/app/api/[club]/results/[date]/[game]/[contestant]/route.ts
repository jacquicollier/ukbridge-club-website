import { getObject } from '@/app/api/clubs/utils/s3';

export async function GET(
  _req: Request,
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
    const { Body, ContentType } = await getObject(
      `${club}.ukbridge.club`,
      `results/${date}/${game}/usebio.xml`,
    );

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
