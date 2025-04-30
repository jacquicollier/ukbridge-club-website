import {
  S3Client,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { SQSEvent } from 'aws-lambda';
import { Readable } from 'node:stream';
import { parseStringPromise } from 'xml2js';
import { UsebioFile } from './usebio/model';
import { PBNFile } from './pbn/model';
import { generateContestants } from './contestant-generator';

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

      let usebioFile: UsebioFile | null = null;
      let pbnFile: PBNFile | null = null;

      if (key.endsWith('usebio.xml')) {
        const pbnKey = key.replace('usebio.xml', 'hands.pbn');
        if (await checkIfFileExists(bucketName, pbnKey)) {
          pbnFile = await loadObject<PBNFile>(bucketName, key);
        }

        await saveJsonToS3(
          bucketName,
          key.replace('usebio.xml', 'contestants.json'),
          generateContestants(
            await loadObject<UsebioFile>(bucketName, key),
            pbnFile,
          ),
        );
      } else if (key.endsWith('hands.pbn')) {
        const usebioKey = key.replace('hands.pbn', 'usebio.xml');
        if (await checkIfFileExists(bucketName, usebioKey)) {
          usebioFile = await loadObject<UsebioFile>(bucketName, key);
        }

        await saveJsonToS3(
          bucketName,
          key.replace('hands.pbn', 'contestants.json'),
          generateContestants(
            usebioFile,
            await loadObject<PBNFile>(bucketName, key),
          ),
        );
      } else {
        console.log('Skipping key:', key);
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

async function loadObject<T>(
  bucketName: string,
  key: string,
): Promise<T | null> {
  const { Body } = await s3.send(
    new GetObjectCommand({ Bucket: bucketName, Key: key }),
  );

  if (!Body) return null;

  if (Body instanceof Readable) {
    return (await parseStringPromise(await streamToString(Body), {
      explicitArray: false,
    })) as T;
  }

  return null;
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
