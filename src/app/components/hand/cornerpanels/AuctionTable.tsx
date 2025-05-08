import { Auction, Directions } from '@/app/components/hand/board/model';

export default function AuctionTable(props: { auction: Auction }) {
  // Determine the starting index based on the first bid position
  const startIndex = Directions.indexOf(props.auction.opener);

  // Initialize a list to store formatted rows
  const formattedBids: string[][] = [];
  let currentRow = new Array(4).fill(''); // Create an empty row for the first set of bids

  let position = startIndex; // Set position to dealer's column

  props.auction.bids.forEach((bid, index) => {
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
    <table className='border-collapse bg-gray-100 text-sm'>
      <thead>
        <tr>
          {Directions.map((dir) => (
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
  );
}
