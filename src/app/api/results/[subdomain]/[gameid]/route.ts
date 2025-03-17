import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.S3_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(
  request: Request,
  { params }: { params: Promise<{ subdomain: string; gameid: string }> },
) {
  const { subdomain, gameid } = await params;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return Response.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `${subdomain}/${gameid}/${file.name}`,
      Body: buffer,
      ContentType: file.type,
    });

    await s3.send(command);

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
