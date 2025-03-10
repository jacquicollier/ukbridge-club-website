'use client';

import React, { useState } from 'react';

export default function CollapsiblePanel({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className='absolute right-2 top-2 z-10 inline-block transition-all duration-300'>
      {/* Title Bar with button aligned to the right */}
      <div
        className={`flex cursor-pointer items-center rounded-t-lg bg-gray-400 px-4 text-white transition-all duration-300 ${
          isOpen ? 'justify-between' : 'w-10 justify-end'
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen && <span>&nbsp;</span>} {/* Show title only when open */}
        <span className='ml-auto' title='Auction'>
          {isOpen ? '−' : '+'}
        </span>{' '}
        {/* Toggle Icon */}
      </div>

      {/* Collapsible Content - Positioned to the left of the button */}
      <div
        className={`absolute right-0 overflow-hidden transition-all duration-300 ${
          isOpen ? 'h-auto scale-100 opacity-100' : 'h-0 scale-95 p-0 opacity-0'
        }`}
        style={{ width: isOpen ? 'auto' : '40px' }} // Ensure the panel width shrinks
      >
        {children}
      </div>
    </div>
  );
}
