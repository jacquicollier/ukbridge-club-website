import AWS from 'aws-sdk';

import { parseUsebio } from './parseUsebio';
import { parsePbn } from './parsePbn';

const s3 = new AWS.S3();
// const sqs = new AWS.SQS();

exports.handler = async (event) => {
  console.log('Received SQS event:', JSON.stringify(event, null, 2));

  // Loop through SQS records
  for (const record of event.Records) {
    const s3Event = JSON.parse(record.body);
    const bucketName = s3Event.Records[0].s3.bucket.name;
    const key = s3Event.Records[0].s3.object.key;

    if (key.endsWith('usebio.xml')) {
      try {
        const usebioData = await processUsebio(bucketName, key);
        let pbnData = null;

        const pbnKey = key.replace('usebio.xml', 'hands.pbn');
        if (await checkIfFileExists(bucketName, pbnKey)) {
          pbnData = await processPbn(bucketName, pbnKey);
        }

        // Combine the data (usebio + pbn) and create JSON
        const resultJson = {
          usebio: usebioData,
          pbn: pbnData || null,
        };

        const jsonKey = key.replace('usebio.xml', 'results.json');
        await saveJsonToS3(bucketName, jsonKey, resultJson);
      } catch (error) {
        console.error('Error processing files:', error);
      }
    }
  }

  return {
    statusCode: 200,
    body: 'Processing complete.',
  };
};

async function processUsebio(bucketName, key) {
  const data = await s3.getObject({ Bucket: bucketName, Key: key }).promise();
  // Parse the usebio.xml content and return the parsed data
  return parseUsebio(data.Body.toString());
}

async function processPbn(bucketName, key) {
  const data = await s3.getObject({ Bucket: bucketName, Key: key }).promise();
  // Parse the hands.pbn content and return the parsed data
  return parsePbn(data.Body.toString());
}

async function checkIfFileExists(bucketName, key) {
  try {
    await s3.headObject({ Bucket: bucketName, Key: key }).promise();
    return true; // File exists
  } catch (error) {
    return false; // File does not exist
  }
}

async function saveJsonToS3(bucketName, key, jsonData) {
  const params = {
    Bucket: bucketName,
    Key: key,
    Body: JSON.stringify(jsonData),
    ContentType: 'application/json',
  };
  await s3.putObject(params).promise();
}
