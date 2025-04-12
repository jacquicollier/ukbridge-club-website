'use client';

import React, { useEffect, useState } from 'react';
import DatesList from '@/app/club/[club]/results/sessions/components/DatesList';

export default function ResultsPage({
  params,
}: {
  params: Promise<{ club: string }>;
}) {
  const { club } = React.use(params);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/${club}/results`,
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        setDates(await response.json());
      } catch (err) {
        console.error('Error fetching dates:', err);
        throw err;
      }
    };

    fetchDates();
  }, [club]);

  return (
    <div className='p-4'>
      <div className='mx-auto max-w-4xl p-4'>
        <h2 className='mb-4 text-center text-2xl font-semibold'>Results</h2>
        <DatesList club={club} dates={dates} />
      </div>
    </div>
  );
}
