'use client';

import { useState } from 'react';
import BridgeDealPlay from '@/app/components/play/BridgeDealPlay';
import { Hand } from '@/app/model/recordofplay/pbn/hand';
import { convertPBNToJSON } from '@/app/hand/pbnConverter';
import { defaultHands } from '@/app/model/recordofplay/pbn/hands';
import { PBNRecordOfPlayGenerator } from '@/app/model/recordofplay/pbn/PBNRecordOfPlayGenerator';

export default function Page() {
  const [pbnInput, setPbnInput] = useState('');
  const [hands, setHands] = useState<Hand[]>(defaultHands); // Replace with actual type

  const handleConvertPBN = () => {
    // Logic to convert PBN to hands
    const parsedHands = parsePBN(pbnInput); // Implement parsePBN function
    setHands(parsedHands);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; // Get the selected file
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setPbnInput(e.target?.result as string); // Set file content to state
    };
    reader.readAsText(file); // Read file as text
  };

  return (
    <div className='flex h-screen'>
      {/* Left Column - PBN Input */}
      <div className='hidden flex-col overflow-auto border-r border-gray-300 p-4 md:flex md:w-1/2'>
        <input
          type='file'
          accept='.txt,.pbn'
          onChange={handleFileUpload}
          className='mb-4'
        />
        <textarea
          className='w-full grow resize-none overflow-auto rounded border p-2'
          placeholder='Enter PBN here...'
          value={pbnInput}
          onChange={(e) => setPbnInput(e.target.value)}
        />
      </div>

      {/* Convert Button (Between Columns) */}
      <div className='hidden w-16 items-center justify-center md:flex'>
        <button
          className='rounded bg-blue-500 p-2 text-white hover:bg-blue-700'
          onClick={handleConvertPBN}
        >
          Convert
        </button>
      </div>

      {/* Right Column - Hands Layout */}
      <div className='overflow-auto p-4 md:w-1/2'>
        {hands.length > 0 ? (
          <div className='flex flex-row flex-wrap'>
            {hands.map((hand, index) => (
              <BridgeDealPlay
                key={index}
                recordOfPlay={new PBNRecordOfPlayGenerator(hand).recordOfPlay()}
                result={true}
              />
            ))}
          </div>
        ) : (
          <p className='text-gray-500'>No hands generated yet.</p>
        )}
      </div>
    </div>
  );
}

// Placeholder for PBN parsing logic
function parsePBN(pbn: string): Hand[] {
  return JSON.parse(convertPBNToJSON(pbn)) as Hand[];
}
