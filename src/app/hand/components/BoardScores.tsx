import { ValueAndDetails } from '@/app/model/pbn/hand';
import React from 'react';

export default function BoardScores(props: { scores: ValueAndDetails }) {
  const keyValuePairs = props.scores.value.split(';');
  const keys = keyValuePairs.map((pair) => pair.split('\\')[0]);

  return (
    <div className='absolute inset-4 z-20 size-[calc(100%-2rem)] overflow-scroll border border-black bg-white text-sm'>
      <table>
        <thead>
          <tr>
            {keys.map((key) => (
              <th key={key} className='py-1 text-center'>
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.scores.details.map((row, index) => {
            const columns = row.trim().split(/\s+/); // Split by spaces
            return (
              <tr key={index} className='border'>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className='border'>
                    {col}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
