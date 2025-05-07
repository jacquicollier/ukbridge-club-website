import { getObject, streamToString } from '@/app/api/utils/s3';
import { Readable } from 'node:stream';

export async function getJSONForClub(
  club: string,
  file: string,
): Promise<Response> {
  try {
    const { Body } = await getObject(`${club}.ukbridge.club`, file);

    if (!Body || !(Body instanceof Readable)) {
      return Response.json({ error: 'Not found' }, { status: 404 });
    }

    // Return JSON response
    return new Response(await streamToString(Body), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
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
