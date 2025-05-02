// import { parseStringPromise } from 'xml2js';
// import { UsebioFile } from '../../../../../../../amplify/backend/function/ukbridgeclubprocessresults/lib/usebio/model';
import { putObject } from '@/app/api/clubs/utils/s3';

export async function GET() {
  try {
    // const { club, date, game } = await params;

    // const usebioFile = await getAndParseObject<UsebioFile>(
    //   `${club}.ukbridge.club`,
    //   `results/${date}/${game}/usebio.xml`,
    //   {
    //     parser: async (fileContent: string) => {
    //       return (await parseStringPromise(fileContent, {
    //         explicitArray: false,
    //       })) as UsebioFile;
    //     },
    //   },
    // );

    const recordOfPlay = '';

    // Return JSON response
    return new Response(recordOfPlay, {
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

    await putObject(
      process.env.AWS_S3_BUCKET_NAME!,
      `${club}/${game}/${file.name.endsWith('.xml') ? 'usebio.xml' : 'hands.pbn'}`,
      file,
      Buffer.from(await file.arrayBuffer()),
    );
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
