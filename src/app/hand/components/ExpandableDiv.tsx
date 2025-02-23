'use client';

import { ReactNode, useState } from 'react';
import { Plus, Minus } from 'lucide-react';

interface ExpandableDivProps {
  children: ReactNode;
}

export default function ExpandableDiv({ children }: ExpandableDivProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='relative w-64 rounded-lg border bg-white p-4 shadow-lg'>
      {/* Toggle Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className='absolute right-2 top-2 rounded-full bg-gray-200 p-1'
      >
        {isExpanded ? <Minus size={16} /> : <Plus size={16} />}
      </button>

      {/* Content */}
      <div
        className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-12'}`}
      >
        {children}
      </div>

      {/*<div className="transition-all duration-300 overflow-hidden" style={{ maxHeight: isExpanded ? "200px" : "40px" }}>*/}
      {/*  <p className="truncate">This is some expandable content. Click the button to toggle more text visibility.</p>*/}
      {/*  {isExpanded && <p className="mt-2">Here is the expanded content!</p>}*/}
      {/*</div>*/}
    </div>
  );
}
