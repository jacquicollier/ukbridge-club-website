import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.S3_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ subdomain: string; gameid: string; filename: string }>;
  },
) {
  try {
    const { subdomain, gameid, filename } = await params;

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${subdomain}/${gameid}/${filename}`,
    });

    const { Body, ContentType } = await s3.send(command);

    return new Response(Body as ReadableStream, {
      headers: {
        'Content-Type': ContentType || 'application/octet-stream', // Fallback if missing
        'Content-Disposition': `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    return Response.json({ error: (error as Error).message }, { status: 500 });
  }
}
