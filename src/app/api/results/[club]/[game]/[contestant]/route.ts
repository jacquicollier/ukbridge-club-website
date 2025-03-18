import { GetObjectCommand } from '@aws-sdk/client-s3';
import { s3 } from '@/app/s3';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ club: string; game: string; contestant: string }>;
  },
) {
  try {
    const { club, game, contestant } = await params;

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${club}/${game}/${contestant}`,
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
