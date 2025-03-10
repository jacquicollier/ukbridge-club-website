import { parseStringPromise } from 'xml2js';
import fs from 'fs';
import path from 'path';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ filename: string }> },
) {
  const { filename } = await params;
  try {
    // Log the filename and check for correctness
    console.log('Requested filename:', filename);

    // Locate the XML file in the public folder
    const filePath = path.join(
      process.cwd(),
      'public',
      'usebio',
      `${filename}.xml`,
    );

    // Log the full path for debugging
    console.log('File path to read:', filePath);

    // Check if the file exists before reading
    if (!fs.existsSync(filePath)) {
      console.log('File not found:', filePath);
      return new Response(JSON.stringify({ error: 'File not found' }), {
        status: 404,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }

    // Read the XML file synchronously
    const xmlData = fs.readFileSync(filePath, 'utf-8');

    // Log the raw XML content for debugging
    console.log('XML Data:', xmlData);

    // Convert XML to JSON
    const jsonData = await parseStringPromise(xmlData, {
      explicitArray: false,
    });

    // Return JSON response
    return new Response(JSON.stringify(jsonData), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    // Log the error for debugging
    console.error('Error occurred while processing XML:', error);

    return new Response(JSON.stringify({ error: 'Failed to load XML file' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}

// function buildSuccessResponse(data: any, statusCode: number) {
//   return NextResponse.json(
//     {
//       content: data,
//       statusCode,
//     },
//     { status: statusCode },
//   );
// }
//
// export async function buildErrorResponse(error: unknown, statusCode: number) {
//   // Ensure the error is an instance of Error
//   const errorMessage = error instanceof Error ? error.message : String(error);
//
//   return NextResponse.json(
//     {
//       content: { error: errorMessage },
//       statusCode,
//     },
//     { status: statusCode },
//   );
// }
