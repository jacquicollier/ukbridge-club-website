'use client';

import { useState } from 'react';
import dayjs from 'dayjs';
import ResultsList from '@/app/club/[club]/results/sessions/components/ResultsList';

function DatesList({ club, dates }: { club: string; dates: string[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const togglePanel = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='space-y-4'>
      {dates.length > 0 ? (
        dates.map((date, index) => (
          <div
            key={index}
            className='cursor-pointer rounded-lg border bg-white shadow-md'
            onClick={() => togglePanel(index)}
          >
            <div className='p-4'>
              <h3 className='text-lg font-semibold'>
                {dayjs(date, 'YYYYMMDD').format('D MMMM YYYY')}
              </h3>
            </div>

            {openIndex === index && (
              <div className='border-t bg-gray-50 px-4 py-2 text-sm text-gray-700'>
                {openIndex !== null && (
                  <ResultsList club={club} date={dates[openIndex]} />
                )}
              </div>
            )}
          </div>
        ))
      ) : (
        <p className='text-center text-gray-500'>No results found.</p>
      )}
    </div>
  );
}

export default DatesList;
