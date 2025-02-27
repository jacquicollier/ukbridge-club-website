import React from 'react';
import { ValueAndDetails } from '@/app/model/pbn/hand';

const directions = ['N', 'E', 'S', 'W'];

export default function AuctionTable(props: { auction: ValueAndDetails }) {
  // Flatten auction details into a single array of bids
  const bids = props.auction.details.flatMap((line) => line.split(' '));

  // Determine the starting index based on the first bid position
  const startIndex = directions.indexOf(props.auction.value);

  // Initialize a list to store formatted rows
  const formattedBids: string[][] = [];
  let currentRow = new Array(4).fill(''); // Create an empty row for the first set of bids

  let position = startIndex; // Set position to dealer's column

  bids.forEach((bid, index) => {
    // If we're at the start of the auction, we need to insert blank cells before the dealer
    if (index === 0) {
      for (let i = 0; i < startIndex; i++) {
        currentRow[i] = ''; // Fill with blanks until the dealer's column
      }
    }

    // Place bid in correct position
    currentRow[position] = bid;

    // Move to next position
    position = (position + 1) % 4;

    // If we've completed a row (4 entries filled), push it and start a new one
    if (position === 0) {
      formattedBids.push(currentRow);
      currentRow = new Array(4).fill('');
    }
  });

  // Push the last row if it contains any bids
  if (currentRow.some((cell) => cell !== '')) {
    formattedBids.push(currentRow);
  }

  return (
    //   <div className='absolute right-2 top-2 rounded-lg border bg-gray-100 shadow-lg'>
    //   <h3 className='font-bold'>Optimal Contract</h3>
    //   <p>4S by West</p>
    // </div>

    // <ExpandableDiv>
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
                <td key={colIndex} className='px-1 text-center'>
                  {bid}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    // </ExpandableDiv>
  );
}
