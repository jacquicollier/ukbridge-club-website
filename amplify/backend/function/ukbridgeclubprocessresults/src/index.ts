import {
  S3Client,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { SQSEvent } from 'aws-lambda';
import { parseUsebio } from './parseUsebio';
import { parsePbn } from './parsePbn';
import { Readable } from 'node:stream';

const s3 = new S3Client({});

export const handler = async (event: SQSEvent) => {
  console.log('Received SQS event:', JSON.stringify(event, null, 2));

  for (const record of event.Records) {
    try {
      const s3Event = JSON.parse(record.body);

      if (!s3Event.Records || !s3Event.Records[0]) {
        console.warn('Skipping non-S3 event message:', record.body);
        continue; // skip this message
      }

      const bucketName = s3Event.Records[0].s3.bucket.name;
      const key = s3Event.Records[0].s3.object.key;

      if (key.endsWith('usebio.xml')) {
        const usebioData = await processUsebio(bucketName, key);
        let pbnData = null;

        const pbnKey = key.replace('usebio.xml', 'hands.pbn');
        if (await checkIfFileExists(bucketName, pbnKey)) {
          pbnData = await processPbn(bucketName, pbnKey);
        }

        const resultJson = {
          usebio: usebioData,
          pbn: pbnData || null,
        };

        const jsonKey = key.replace('usebio.xml', 'results.json');
        await saveJsonToS3(bucketName, jsonKey, resultJson);
      }
    } catch (err) {
      console.error('Error processing record:', err);
    }
  }

  return {
    statusCode: 200,
    body: 'Processing complete.',
  };
};

async function processUsebio(bucketName: string, key: string) {
  const { Body } = await s3.send(
    new GetObjectCommand({ Bucket: bucketName, Key: key }),
  );

  if (!Body) return [];

  if (Body instanceof Readable) {
    const bodyString = await streamToString(Body);
    return parseUsebio(bodyString);
  }
}

async function processPbn(bucketName: string, key: string) {
  const { Body } = await s3.send(
    new GetObjectCommand({ Bucket: bucketName, Key: key }),
  );

  if (!Body) return [];

  if (Body instanceof Readable) {
    const bodyString = await streamToString(Body);
    return parsePbn(bodyString);
  }
}

async function checkIfFileExists(bucketName: string, key: string) {
  try {
    const command = new HeadObjectCommand({ Bucket: bucketName, Key: key });
    await s3.send(command);
    return true;
  } catch (error) {
    if (error instanceof Error && error.name === 'NotFound') {
      return false;
    } else {
      console.error('Error checking if file exists:', error);
      throw error;
    }
  }
}

async function saveJsonToS3(bucketName: string, key: string, jsonData: object) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: JSON.stringify(jsonData),
    ContentType: 'application/json',
  });
  await s3.send(command);
}

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
