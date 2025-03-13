'use client';

import { createContext, useContext, ReactNode } from 'react';
import { DDSInstance } from '@/app/model/dds/model';

interface DDSContextType {
  ddsInstance: DDSInstance;
}

const DDSContext = createContext<DDSContextType | undefined>(undefined);

export function DDSProvider({
  children,
  ddsInstance,
}: {
  children: ReactNode;
  ddsInstance: DDSInstance;
}) {
  return (
    <DDSContext.Provider value={{ ddsInstance }}>
      {children}
    </DDSContext.Provider>
  );
}

export function useDDS() {
  const context = useContext(DDSContext);
  if (!context) {
    throw new Error('useDDS must be used within a DDSProvider');
  }
  return context;
}
