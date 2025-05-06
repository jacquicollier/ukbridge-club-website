import {
  S3Client,
  GetObjectCommand,
  HeadObjectCommand,
  PutObjectCommand,
} from '@aws-sdk/client-s3';
import { SQSEvent } from 'aws-lambda';
import { Readable } from 'node:stream';
import { UsebioFile } from './usebio/model';
import { generateBoards } from './boards/boards-generator';
import { PBNHand } from './pbn/model';
import { loadPBN } from './pbn/pbnConverter';
import { loadUsebio } from './usebio/usebioConverter';
import { generateContestants } from './contestants/contestants-generator';
import { generateTravellers } from './travellers/travellers-generator';
import { generateScoreCards } from './scorecard/scorecards-generator';
import { generateSessionScores } from './session-score/session-score-generator';

const s3 = new S3Client({});

export const handler = async (event: SQSEvent) => {
  console.log('Received SQS event:', JSON.stringify(event, null, 2));

  for (const record of event.Records) {
    try {
      const s3Event = JSON.parse(record.body);
      const s3Info = s3Event.Records?.[0]?.s3;
      if (!s3Info) {
        console.warn('Skipping non-S3 event message:', record.body);
        continue;
      }

      const {
        bucket: { name: bucketName },
        object: { key },
      } = s3Info;
      await processFilePair(bucketName, key);
    } catch (err) {
      console.error('Error processing record:', err);
    }
  }

  return {
    statusCode: 200,
    body: 'Processing complete.',
  };
};

async function processFilePair(bucket: string, key: string) {
  const [usebioKey, pbnKey] = resolveFilePair(key);

  const usebioString = await tryLoadFile(bucket, usebioKey);
  const pbnString = await tryLoadFile(bucket, pbnKey);

  const usebio = usebioString ? await loadUsebio(usebioString) : null;
  const pbn = pbnString ? loadPBN(pbnString) : null;

  await writeOutputs(bucket, usebioKey ?? pbnKey, usebio, pbn);
}

function resolveFilePair(key: string): [string | null, string | null] {
  if (key.endsWith('usebio.xml')) {
    return [key, key.replace('usebio.xml', 'hands.pbn')];
  } else if (key.endsWith('hands.pbn')) {
    return [key.replace('hands.pbn', 'usebio.xml'), key];
  }
  console.log('Skipping unsupported key:', key);
  return [null, null];
}

async function tryLoadFile(
  bucket: string,
  key: string | null,
): Promise<string | null> {
  if (!key || !(await checkIfFileExists(bucket, key))) return null;
  return await loadObject(bucket, key);
}

async function writeOutputs(
  bucket: string,
  baseKey: string | null,
  usebioFile: UsebioFile | null,
  pbnFile: PBNHand[] | null,
) {
  if (!baseKey) return;

  const base = baseKey.replace(/(usebio\.xml|hands\.pbn)$/, '');

  await Promise.all([
    saveJsonToS3(
      bucket,
      `${base}contestants.json`,
      generateContestants(usebioFile, pbnFile),
    ),
    saveJsonToS3(
      bucket,
      `${base}boards.json`,
      generateBoards(usebioFile, pbnFile),
    ),
    saveJsonToS3(
      bucket,
      `${base}travellers.json`,
      generateTravellers(usebioFile, pbnFile),
    ),
    saveJsonToS3(
      bucket,
      `${base}scorecard.json`,
      generateScoreCards(usebioFile, pbnFile),
    ),
    saveJsonToS3(
      bucket,
      `${base}session-scores.json`,
      generateSessionScores(usebioFile, pbnFile),
    ),
  ]);
}

async function loadObject(bucket: string, key: string): Promise<string | null> {
  const { Body } = await s3.send(
    new GetObjectCommand({ Bucket: bucket, Key: key }),
  );
  return Body instanceof Readable ? streamToString(Body) : null;
}

async function checkIfFileExists(
  bucket: string,
  key: string,
): Promise<boolean> {
  try {
    await s3.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
    return true;
  } catch (err) {
    if (err instanceof Error && err.name === 'NotFound') return false;
    console.error('Error checking file existence:', err);
    throw err;
  }
}

async function saveJsonToS3(bucket: string, key: string, jsonData: object) {
  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(jsonData),
      ContentType: 'application/json',
    }),
  );
}

function streamToString(stream: Readable): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    stream.on('data', (chunk) => chunks.push(chunk));
    stream.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    stream.on('error', reject);
  });
}
