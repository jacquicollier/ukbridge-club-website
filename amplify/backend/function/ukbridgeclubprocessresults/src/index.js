import {
  S3Client,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { parseUsebio } from './parseUsebio.js';
import { parsePbn } from './parsePbn.js';

const s3 = new S3Client({});

export const handler = async (event) => {
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

async function processUsebio(bucketName, key) {
  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  const data = await s3.send(command);

  const bodyString = await streamToString(data.Body);
  return parseUsebio(bodyString);
}

async function processPbn(bucketName, key) {
  const command = new GetObjectCommand({ Bucket: bucketName, Key: key });
  const data = await s3.send(command);

  const bodyString = await streamToString(data.Body);
  return parsePbn(bodyString);
}

async function checkIfFileExists(bucketName, key) {
  try {
    const command = new HeadObjectCommand({ Bucket: bucketName, Key: key });
    await s3.send(command);
    return true; // File exists
  } catch (error) {
    if (error.name === 'NotFound') {
      return false;
    }
    console.error('Error checking if file exists:', error);
    throw error; // unexpected error
  }
}

async function saveJsonToS3(bucketName, key, jsonData) {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: JSON.stringify(jsonData),
    ContentType: 'application/json',
  });
  await s3.send(command);
}

// Helper to read stream to string
async function streamToString(stream) {
  if (typeof stream === 'string') return stream;

  return await new Promise((resolve, reject) => {
    const chunks = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('error', reject);
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
  });
}
