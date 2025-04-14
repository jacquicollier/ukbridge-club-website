import {
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { NextResponse } from 'next/server';

console.log({
  region: process.env.S3_AWS_REGION,
  accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY,
});

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: Promise<{ club: string }>;
  },
) {
  const s3 = new S3Client({
    region: process.env.S3_AWS_REGION!,
    credentials: {
      accessKeyId: process.env.S3_AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY!,
    },
  });

  try {
    const p = await params;
    const Bucket = `${p.club}.ukbridge.club`;
    const command = new ListObjectsV2Command({
      Bucket,
      Delimiter: '/', // <- important for simulating folders
      Prefix: 'results/', // or use a path like 'somefolder/' to scope it
    });

    const result = await s3.send(command);

    // result.CommonPrefixes contains the "directories"
    const folders =
      result.CommonPrefixes?.map(
        (prefix) => prefix.Prefix!.split('/')[1],
      ).reverse() || [];

    return NextResponse.json(folders);
  } catch (error: unknown) {
    console.error('Error listing S3 directories:', error);
    return NextResponse.json(
      { error: 'Failed to list directories' },
      { status: 500 },
    );
  }
}

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
