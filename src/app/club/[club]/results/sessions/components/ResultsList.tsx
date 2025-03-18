export type Result = {
  title: string;
  date: Date;
  realBridgeLink: string | null;
  resultsLink: string;
};

const options: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

export default function ResultsList({ results }: { results: Result[] }) {
  return (
    <div className='space-y-4'>
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} className='rounded-lg border bg-white p-4 shadow-md'>
            <h3 className='text-lg font-semibold'>{result.title}</h3>
            <p className='text-gray-600'>
              {result.date.toLocaleString('en-GB', options)}
            </p>

            <div className='mt-3 flex gap-2'>
              {result.realBridgeLink && (
                <a
                  href={result.realBridgeLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600'
                >
                  Real Bridge
                </a>
              )}
              {result.resultsLink && (
                <a
                  href={result.resultsLink}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='rounded-md bg-green-500 px-4 py-2 text-sm text-white hover:bg-green-600'
                >
                  Results
                </a>
              )}
            </div>
          </div>
        ))
      ) : (
        <p className='text-center text-gray-500'>No events found.</p>
      )}
    </div>
  );
}
