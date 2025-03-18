import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { Readable } from 'node:stream';
import { parseStringPromise } from 'xml2js';
import { USEBIORecordOfPlayGenerator } from '@/app/api/results/[club]/[game]/recordofplay/usebio/USEBIORecordOfPlayGenerator';
import { UsebioFile } from '@/app/api/results/[club]/[game]/recordofplay/usebio/model';

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
    params: Promise<{ club: string; game: string }>;
  },
) {
  try {
    const { club, game } = await params;

    const command = new GetObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      Key: `${club}/${game}/usebio.xml`,
    });

    const { Body } = await s3.send(command);

    // Convert the Body (stream) to a string if it exists
    if (Body instanceof Readable) {
      const fileContent = await streamToString(Body);

      // Convert XML to JSON
      const jsonData = await parseStringPromise(fileContent, {
        explicitArray: false,
      });

      // Return JSON response
      return new Response(
        JSON.stringify(
          new USEBIORecordOfPlayGenerator(
            (jsonData as UsebioFile).USEBIO,
          ).recordOfPlay(),
        ),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } else {
      throw new Error('The body is not a stream.');
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === 'NoSuchKey') {
        // Handle the case where the file is not found

        return Response.json(
          { error: (error as Error).message },
          { status: 404 },
        );
        // You can return a custom response or perform any other handling here.
      } else {
        // Handle other errors (e.g., permissions, network issues, etc.)
        console.error('Error retrieving file:', error.message);
        return Response.json(
          { error: (error as Error).message },
          { status: 500 },
        );
      }
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

    const buffer = Buffer.from(await file.arrayBuffer());

    const command = new PutObjectCommand({
      Bucket: process.env.AWS_S3_BUCKET_NAME!,
      Key: `${club}/${game}/${file.name.endsWith('.xml') ? 'usebio.xml' : 'hands.pbn'}`,
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

// Helper function to convert stream to string
async function streamToString(stream: Readable): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];

    stream.on('data', (chunk: Buffer) => {
      chunks.push(chunk);
    });

    stream.on('end', () => {
      resolve(Buffer.concat(chunks).toString('utf-8')); // Convert the buffer to a string
    });

    stream.on('error', reject);
  });
}
