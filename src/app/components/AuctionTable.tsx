import React from 'react';
import { ValueAndDetails } from '@/app/model/pbn/hand';

const directions = ['N', 'E', 'S', 'W'];

export default function AuctionTable(props: { auction: ValueAndDetails }) {
  // Flatten auction details into a single array of bids
  const bids = props.auction.details.flatMap((line) => line.split(' '));

  // Determine the starting index based on the first bid position
  const startIndex = directions.indexOf(props.auction.value);

  // Rotate bids to always align with N starting in column 1
  const rotatedBids = bids.map((bid, i) => ({
    position: (startIndex + i) % 4, // Rotate position within N, E, S, W
    bid,
  }));

  // Organize bids into rows of 4, ensuring correct positioning
  const formattedBids: string[][] = [];
  for (let i = 0; i < rotatedBids.length; i += 4) {
    const row = ['', '', '', '']; // Empty placeholders for each seat
    rotatedBids.slice(i, i + 4).forEach(({ position, bid }) => {
      row[position] = bid; // Place bid in the correct column
    });
    formattedBids.push(row);
  }

  return (
    //   <div className='absolute right-2 top-2 rounded-lg border bg-gray-100 shadow-lg'>
    //   <h3 className='font-bold'>Optimal Contract</h3>
    //   <p>4♠ by West</p>
    // </div>

    <div className='absolute right-2 top-2 rounded-lg bg-gray-100 shadow-lg'>
      <table className='border-collapse text-sm'>
        <thead>
          <tr>
            {directions.map((dir) => (
              <th key={dir} className='py-1 text-center'>
                {dir} {/* Fixed order: N, E, S, W */}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {formattedBids.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((bid, colIndex) => (
                <td key={colIndex} className='p-1 text-center'>
                  {bid}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
