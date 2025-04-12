'use client';

import { Button } from '@aws-amplify/ui-react';
import { useDDS } from '@/app/context/DDSContext';
import { Card, Direction, Suit } from '@/app/model/types';
import { useEffect, useState } from 'react';
import { SuitMap } from '@/app/model/constants';
import { generatePbnString } from '@/app/api/[club]/results/[date]/[game]/recordofplay/utils';

export default function DDSTable(props: {
  deal: { [key in Direction]: Card[] };
}) {
  const { ddsInstance } = useDDS();
  const [ddTable, setDDTable] = useState<number[][] | null>(null);

  useEffect(() => {
    if (ddTable == null) {
      const deal_string = generatePbnString(props.deal);
      console.log(deal_string);
      const deal_string_ptr = ddsInstance.allocateUTF8(deal_string);

      const buf2 = ddsInstance._malloc(20 * 4);
      ddsInstance._do_dds_calc_dd_table(deal_string_ptr, buf2);

      const results: number[][] = Array.from({ length: 4 }, () =>
        Array(5).fill(0),
      );

      for (let i = 0; i < 20; i++) {
        const suitIndex = Math.floor(i / 4); // Determine suit (0-4)
        const declarerIndex = i % 4; // Determine declarer (0-3)

        results[declarerIndex][suitIndex] = ddsInstance.getValue(
          buf2 + i * 4,
          'i32',
        );
      }

      setDDTable(results);

      ddsInstance._free(buf2);
      ddsInstance._free(deal_string_ptr);
    }
  }, [ddTable, ddsInstance, props.deal]);

  const suits = ['S', 'H', 'D', 'C', 'NT'];
  const declarers = ['N', 'E', 'S', 'W'];

  const getSuitClass = (suit: string) =>
    suit === 'H' || suit === 'D' ? 'text-red-500' : 'text-black';

  return (
    <div className='absolute bottom-2 right-2 rounded-lg border bg-gray-100 shadow-lg'>
      {ddTable && (
        <table className='w-full border-collapse text-sm'>
          <thead>
            <tr>
              <th className='p-0.5'>&nbsp;</th>
              {suits.map((suit, index) => (
                <th
                  key={index}
                  className={`p-0.5 font-bold ${getSuitClass(suit)}`}
                >
                  {suit === 'NT' ? 'N' : SuitMap[suit as Suit]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {declarers.map((declarer, rowIndex) => (
              <tr key={rowIndex} className='border-b'>
                <td className='p-0.5 text-center font-bold'>{declarer}</td>
                {ddTable[rowIndex].map((score, colIndex) => (
                  <td key={colIndex} className='p-0.5 text-center'>
                    <Button className='border-2 px-1'>
                      {score > 6 ? score - 6 : '-'}
                    </Button>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
