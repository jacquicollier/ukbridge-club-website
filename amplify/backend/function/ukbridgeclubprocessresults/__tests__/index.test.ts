import { handler } from '../lib';

describe('Lambda handler', () => {
  it('should process a basic SQS event without throwing', async () => {
    jest.mock('@aws-sdk/client-s3', () => {
      return {
        S3Client: jest.fn().mockImplementation(() => ({
          send: jest.fn().mockResolvedValue({
            Body: Buffer.from('<xml>test</xml>'),
          }),
        })),
        GetObjectCommand: jest.fn(),
      };
    });

    const event = {
      Records: [
        {
          body: JSON.stringify({
            Records: [
              {
                s3: {
                  bucket: { name: 'test-bucket' },
                  object: { key: 'results/20250102/event/usebio.xml' },
                },
              },
            ],
          }),
        },
      ],
    };

    // Mock the internal AWS calls if needed here

    const result = await handler(event as any);
    expect(result.statusCode).toBe(200);
  });
});
