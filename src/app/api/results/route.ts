import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const s3 = new S3Client({
  region: process.env.S3_AWS_REGION!,
  credentials: {
    accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return Response.json({ error: 'No file uploaded' }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: file.name, // File name in S3
      Body: buffer,
      ContentType: file.type || 'application/xml',
    });

    await s3.send(command);

    return Response.json({ message: 'File uploaded successfully' });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
