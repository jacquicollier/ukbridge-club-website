'use client';

import { useEffect, useState } from 'react';
import { Result } from '@/app/model/types';

export default function ResultsList({
  club,
  date,
}: {
  club: string;
  date: string;
}) {
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/${club}/results/${date}`,
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        setResults(await response.json());
      } catch (err) {
        console.error('Error fetching results:', err);
        throw err;
      }
    };

    fetchResults();
  }, [club, date]);

  return (
    <div className='space-y-4'>
      {results.length > 0 ? (
        results.map((result, index) => (
          <div key={index} className='rounded-lg border bg-white p-4 shadow-md'>
            <h3 className='text-lg font-semibold'>{result.title}</h3>
            <div className='mt-3 flex gap-2'>
              {/*{result.realBridgeLink && (*/}
              {/*  <a*/}
              {/*    href={result.realBridgeLink}*/}
              {/*    target='_blank'*/}
              {/*    rel='noopener noreferrer'*/}
              {/*    className='rounded-md bg-blue-500 px-4 py-2 text-sm text-white hover:bg-blue-600'*/}
              {/*  >*/}
              {/*    Real Bridge*/}
              {/*  </a>*/}
              {/*)}*/}
              {result.resultsLink && (
                <a
                  href={`sessions/${result.date}/${result.resultsLink}`}
                  // target='_blank'
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
